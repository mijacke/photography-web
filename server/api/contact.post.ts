import { Resend } from 'resend'
import { createHash } from 'crypto'
import { enforceRateLimit } from '../utils/rateLimit'

interface ContactBody {
    name: string
    email: string
    phone?: string
    service?: string
    date?: string
    message: string
    honeypot?: string
}

const MAX = {
    name: 120,
    email: 254,
    phone: 40,
    service: 80,
    date: 40,
    message: 5000,
}

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\u0000-\u001f\u007f]/
// eslint-disable-next-line no-control-regex
const STRIPPABLE_RE = /[\u0000-\u0008\u000b-\u001f\u007f]/g

const hasControlChars = (s: string) => CONTROL_RE.test(s)

const clean = (v: unknown, max: number): string => {
    if (typeof v !== 'string') return ''
    return v.replace(STRIPPABLE_RE, '').slice(0, max).trim()
}

const hashEmail = (email: string): string =>
    createHash('sha256').update(email.toLowerCase()).digest('hex').slice(0, 12)

export default defineEventHandler(async (event) => {
    await enforceRateLimit(event, 'contact', 5, '10 m')

    const body = await readBody<ContactBody>(event)

    if (body?.honeypot) {
        return { success: true }
    }

    const name = clean(body?.name, MAX.name)
    const email = clean(body?.email, MAX.email)
    const message = clean(body?.message, MAX.message)
    const phone = clean(body?.phone, MAX.phone)
    const service = clean(body?.service, MAX.service)
    const date = clean(body?.date, MAX.date)

    if (!name || !email || !message) {
        throw createError({
            statusCode: 400,
            message: 'Chýbajú povinné polia (meno, email, správa)',
        })
    }

    if (!EMAIL_RE.test(email) || hasControlChars(email) || email.length > MAX.email) {
        throw createError({
            statusCode: 400,
            message: 'Neplatný formát emailu',
        })
    }

    const config = useRuntimeConfig()
    const resendApiKey = config.resendApiKey

    if (!resendApiKey) {
        console.error('[CONTACT] Missing RESEND_API_KEY')
        throw createError({
            statusCode: 500,
            message: 'Konfigurácia emailu nie je nastavená',
        })
    }

    const resend = new Resend(resendApiKey)
    const recipientEmail = config.contactRecipientEmail || ''

    const htmlContent = `
        <h2>Nová správa z kontaktného formulára</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Meno:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(name)}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>
            ${phone ? `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Telefón:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(phone)}</td>
            </tr>
            ` : ''}
            ${service ? `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Typ fotenia:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(service)}</td>
            </tr>
            ` : ''}
            ${date ? `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Preferovaný dátum:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(date)}</td>
            </tr>
            ` : ''}
        </table>
        <h3 style="margin-top: 20px;">Správa:</h3>
        <div style="padding: 15px; background: #f9f9f9; border-left: 3px solid #d4a373;">
            ${escapeHtml(message).replace(/\n/g, '<br>')}
        </div>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
            Táto správa bola odoslaná z kontaktného formulára na paulifotografka.sk
        </p>
    `

    try {
        const fromEmail = config.resendFromEmail || 'Pauli Fotografka <onboarding@resend.dev>'

        const { error } = await resend.emails.send({
            from: fromEmail,
            to: recipientEmail,
            replyTo: email,
            subject: `Nová správa od ${name}`,
            html: htmlContent,
        })

        if (error) {
            console.error('[CONTACT] Resend error:', error)
            throw createError({
                statusCode: 500,
                message: 'Nepodarilo sa odoslať email',
            })
        }

        console.log('[CONTACT] Email sent (sender hash:', hashEmail(email) + ')')

        return {
            success: true,
            message: 'Správa bola úspešne odoslaná',
        }
    } catch (err) {
        console.error('[CONTACT] Error:', err)
        throw createError({
            statusCode: 500,
            message: 'Nepodarilo sa odoslať správu. Skúste to prosím neskôr.',
        })
    }
})

function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    }
    return text.replace(/[&<>"']/g, (m) => map[m])
}

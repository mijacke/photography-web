import { Resend } from 'resend'

interface ContactBody {
    name: string
    email: string
    phone?: string
    service?: string
    date?: string
    message: string
    honeypot?: string // Bot trap
}

export default defineEventHandler(async (event) => {
    const body = await readBody<ContactBody>(event)

    if (body.honeypot) {
        return { success: true }
    }

    if (!body.name || !body.email || !body.message) {
        throw createError({
            statusCode: 400,
            message: 'Chýbajú povinné polia (meno, email, správa)',
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
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
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(body.name)}</td>
            </tr>
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></td>
            </tr>
            ${body.phone ? `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Telefón:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(body.phone)}</td>
            </tr>
            ` : ''}
            ${body.service ? `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Typ fotenia:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(body.service)}</td>
            </tr>
            ` : ''}
            ${body.date ? `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Preferovaný dátum:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(body.date)}</td>
            </tr>
            ` : ''}
        </table>
        <h3 style="margin-top: 20px;">Správa:</h3>
        <div style="padding: 15px; background: #f9f9f9; border-left: 3px solid #d4a373;">
            ${escapeHtml(body.message).replace(/\n/g, '<br>')}
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
            replyTo: body.email,
            subject: `Nová správa od ${body.name}`,
            html: htmlContent,
        })

        if (error) {
            console.error('[CONTACT] Resend error:', error)
            throw createError({
                statusCode: 500,
                message: 'Nepodarilo sa odoslať email',
            })
        }

        console.log('[CONTACT] Email sent to', recipientEmail, 'from', body.email)

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

import type { AppMessages } from './types'
import { enMessages } from './en'
import { skMessages } from './sk'

export type Locale = 'en' | 'sk'

export const defaultLocale: Locale = 'sk'

export const translations: Record<Locale, AppMessages> = {
  en: enMessages,
  sk: skMessages
}

export { enMessages, skMessages }
export * from './types'

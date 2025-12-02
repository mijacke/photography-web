import { computed } from 'vue'
import { defaultLocale, translations, type AppMessages, type Locale } from '@/i18n'

export const useLocale = () => useState<Locale>('locale', () => defaultLocale)

export const useAppCopy = () => {
  const locale = useLocale()

  const copy = computed<AppMessages>(() => translations[locale.value] ?? translations[defaultLocale])

  const setLocale = (nextLocale: Locale) => {
    if (translations[nextLocale]) {
      locale.value = nextLocale
    }
  }

  return { locale, copy, setLocale }
}

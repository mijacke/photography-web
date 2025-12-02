export const formatDate = (value?: string, locale = 'sk-SK') =>
  value ? new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(value)) : ''

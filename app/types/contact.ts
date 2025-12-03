export type ContactMapCopy = {
  addressLabel: string
}

export type ContactCard = {
  label: string
  value: string
  href?: string
  type?: 'phone' | 'email' | 'address' | 'location' | 'response'
}

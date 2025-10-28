export function validateBrazilianCellphone(value: string) {
  if (!value) return false

  const regex = /^\(\d{2}\)\s9\d{4}-\d{4}$/

  return regex.test(value)
}

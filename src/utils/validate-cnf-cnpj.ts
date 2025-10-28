export function validateCpfCnpj(value: string) {
  if (!value) return false

  const cleaned = value.replace(/\D/g, '') // remove tudo que não for número

  if (cleaned.length === 11) {
    // CPF
    let sum = 0
    let remainder

    if (/^(\d)\1+$/.test(cleaned)) return false // todos os dígitos iguais

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleaned.substring(i - 1, i), 10) * (11 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleaned.substring(9, 10), 10)) return false

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleaned.substring(i - 1, i), 10) * (12 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleaned.substring(10, 11), 10)) return false

    return true
  } else if (cleaned.length === 14) {
    // CNPJ
    if (/^(\d)\1+$/.test(cleaned)) return false

    const calcCheckDigit = (cnpj: string, pos: number) => {
      let length = pos - 7
      let sum = 0
      for (let i = 0; i < pos - 1; i++) {
        sum += parseInt(cnpj.charAt(i), 10) * length
        length--
        if (length < 2) length = 9
      }
      const result = sum % 11
      return result < 2 ? 0 : 11 - result
    }

    const digit1 = calcCheckDigit(cleaned, 13)
    const digit2 = calcCheckDigit(cleaned, 14)

    if (
      digit1 !== parseInt(cleaned.charAt(12), 10) ||
      digit2 !== parseInt(cleaned.charAt(13), 10)
    )
      return false

    return true
  }

  return false
}

function isNumberEmpty(target: any): boolean {
  return typeof target !== 'number'
}

function isStringEmpty(target: string): boolean {
  return (
    !target ||
    target === undefined ||
    target === null ||
    typeof target !== 'string' ||
    target.trim() === ''
  )
}

function isValidEmail(email: string): boolean {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return regexEmail.test(email)
}

function isCpfValid(cpf: string): boolean {
  const regex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{11})$/;

  return regex.test(cpf);
}

function isCNPJValid(cnpj: string): boolean {
  const regex = /^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})$/

  return regex.test(cnpj);
}

export {
  isNumberEmpty,
  isStringEmpty,
  isValidEmail,
  isCpfValid,
  isCNPJValid
}
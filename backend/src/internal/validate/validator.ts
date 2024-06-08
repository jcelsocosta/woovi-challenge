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

export {
  isNumberEmpty,
  isStringEmpty,
  isValidEmail
}
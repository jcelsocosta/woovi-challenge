import { CreateUserInput, GetUserInput, LoginUserInput } from "../../domain/usecase/ucio/user";
import { isCNPJValid, isCpfValid, isStringEmpty, isValidEmail } from "./validator";

function createUserValidate(input: CreateUserInput): string | null {
  if (isStringEmpty(input.firstName)) return 'O nome não pode ser vazio.'

  if (isStringEmpty(input.lastName)) return 'O sobrenome não pode ser vazio.'

  if (!input.CPF && !input.CNPJ) return 'O CPF ou CNPJ precisa ser informado.'

  if (input.CPF && !isCpfValid(input.CPF)) return 'O CPF não é válido.'

  if (input.CNPJ && !isCNPJValid(input.CNPJ)) return 'O CNPJ não é válido.'

  if (isStringEmpty(input.email)) return 'O email não pode ser vazio.'

  if (!isValidEmail(input.email)) return 'O email não é válido.'

  if (isStringEmpty(input.password)) return 'A senha não pode ser vazia.'

  if (isStringEmpty(input.repeatPassword)) return 'A confirmação da senha não pode ser vazia.'

  return null
}

function loginUserValidate(input: LoginUserInput): string | null {
  if (isStringEmpty(input.email)) return 'O email não pode ser vazio.'

  if (!isValidEmail(input.email)) return 'O email não é válido.'
  
  if (isStringEmpty(input.password)) return 'O password não pode ser vazio.'

  return null
}

function getUserValidate(input: GetUserInput): string | null {
  if (isStringEmpty(input.userID)) return 'O identificador do usuário não pode ser vazio.'
  
  return null
}

export {
  createUserValidate,
  loginUserValidate,
  getUserValidate
}
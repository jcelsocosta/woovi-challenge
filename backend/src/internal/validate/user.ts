import { GetUserInput } from "../../domain/usecase/ucio/user";
import { isStringEmpty } from "./validator";

function getUserValidate(input: GetUserInput): string | null {
  if (isStringEmpty(input.userID)) return 'O identificador do usuário não pode ser vazio.'

  return null
}

export {
  getUserValidate
}
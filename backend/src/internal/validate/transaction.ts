import { CreateTransactionInput } from "../../domain/usecase/ucio/transaction";
import { isNumberEmpty, isStringEmpty } from "./validator";

function createTransactionValidate(input: CreateTransactionInput): string | null {
  if (isStringEmpty(input.senderAccountID)) return 'O identificador da conta do remetente não pode ser vazio.'

  if (isStringEmpty(input.receivedUserID)) return 'O identificador do usuário do destinatário não pode ser vazio.'

  if (isNumberEmpty(input.value)) return 'O valor não pode ser vazio.'

  return null
}

export {
  createTransactionValidate
}
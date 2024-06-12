import { CreateTransactionInput } from "../../domain/usecase/ucio/transaction";
import { isNumberEmpty, isStringEmpty } from "./validator";

function CreateTransactionValidate(input: CreateTransactionInput): string | null {
  if (isStringEmpty(input.senderAccountID)) return 'O identificador da conta do remetente não pode ser vazio.'

  if (isStringEmpty(input.receivedAccountID)) return 'O identificador da conta do destinatário não pode ser vazio.'

  if (isNumberEmpty(input.value)) return 'O valor não pode ser vazio.'

  return null
}

export {
  CreateTransactionValidate
}
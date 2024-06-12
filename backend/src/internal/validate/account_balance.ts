import { GetAccountBalanceByAccountIDInput } from "../../domain/usecase/ucio/account_balance";
import { isStringEmpty } from "./validator";

function getAccountBalanceByAccountIDValidate(input: GetAccountBalanceByAccountIDInput): string | null {
  if (isStringEmpty(input.accountID)) return 'O identificador da conta não pode ser vazio.'

  return null
}

export {
  getAccountBalanceByAccountIDValidate
}
import { ErrorType } from "./error"

type GetAccountBalanceByAccountIDInput = {
  readonly accountID: string
}

type GetAccountBalanceByAccountIDOutput = {
  readonly value: number | null
  readonly error: ErrorType | null
}


export { GetAccountBalanceByAccountIDInput, GetAccountBalanceByAccountIDOutput }
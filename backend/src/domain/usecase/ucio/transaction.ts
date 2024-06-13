import { TransactionModel } from "../../../internal/database/model/transaction"
import { ErrorType } from "./error"

type CreateTransactionInput = {
  readonly senderAccountID: string
  readonly receivedUserID: string
  readonly value: number
}

type CreateTransactionOutput = {
  readonly transaction: TransactionModel | null
  readonly error: ErrorType | null
}

type ListTransactionsByAccountIDInput = {
  readonly accountID: string
}

type LisTransactionsByAccountIDOutput = {
  readonly transactions: TransactionModel[] | null
  readonly error: ErrorType | null
}

export {
  CreateTransactionInput, CreateTransactionOutput,
  ListTransactionsByAccountIDInput, LisTransactionsByAccountIDOutput
}
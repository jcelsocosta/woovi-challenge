import { TransactionModel } from "../transaction";

function toTransactionModel(transaction: TransactionModel): TransactionModel {
  return new TransactionModel (
    transaction.transactionID,
    transaction.createdAt,
    transaction.updatedAt,
    transaction.createdDate
  )
}

export { toTransactionModel }
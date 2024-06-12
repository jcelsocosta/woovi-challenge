import { TransactionModel } from "../transaction";

function toTransactionModel(transaction: TransactionModel): TransactionModel {
  return new TransactionModel (
    transaction.transactionID,
    transaction.createdAt,
    transaction.updatedAt,
    transaction.createdDate,
    transaction.status
  )
}

export { toTransactionModel }
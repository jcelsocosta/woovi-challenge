import { TransactionModel } from "../transaction";

function toTransactionModel(transaction: TransactionModel): TransactionModel {
  return new TransactionModel (
    transaction.transactionID,
    transaction.createdAt,
    transaction.updatedAt,
    transaction.createdDate,
    transaction.senderAccountID,
    transaction.receivedAccountID,
    transaction.value,
    transaction.status,
    transaction.idempotencyKey
  )
}

export { toTransactionModel }
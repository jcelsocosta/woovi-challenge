import { AccountBalanceModel } from "../account_balance";

function toAccountAccountBalanceModelModel(accountBalanceModel: AccountBalanceModel): AccountBalanceModel {
  return new AccountBalanceModel(
    accountBalanceModel.accountBalanceID,
    accountBalanceModel.createdAt,
    accountBalanceModel.updatedAt,
    accountBalanceModel.createdDate,
    accountBalanceModel.accountID,
    accountBalanceModel.value
  )
}

export {
  toAccountAccountBalanceModelModel
}
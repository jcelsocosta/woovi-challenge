import { AccountModel } from "../account";

function toAccountModel(accountModel: AccountModel): AccountModel {
  return new AccountModel(
    accountModel.accountID,
    accountModel.createdAt,
    accountModel.updatedAt,
    accountModel.createdDate,
    accountModel.userID
  )
}

export {
  toAccountModel
}
import { UserModel } from "../user";

function toUserModel(userModel: UserModel): UserModel {
  return new UserModel(
    userModel.userID,
    userModel.createdAt,
    userModel.updatedAt,
    userModel.createdDate,
    userModel.taxID,
    userModel.firstName,
    userModel.lastName,
    userModel.email,
    userModel.password
  )
}

export {
  toUserModel
}
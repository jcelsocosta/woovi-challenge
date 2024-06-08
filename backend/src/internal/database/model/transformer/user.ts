import { UserModel } from "../user";

function toUserModel(userModel: UserModel): UserModel {
  return new UserModel(
    userModel.id,
    userModel.userID
  )
}

export {
  toUserModel
}
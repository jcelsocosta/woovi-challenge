import { UserModel } from "../../../internal/database/model/user"
import { ErrorType } from "./error"

type CreateUserOutput = {
  readonly user: UserModel | null
  readonly error: ErrorType | null
}

type GetUserInput = {
  readonly userID: string
}

type GetUserOutput = {
  readonly user: UserModel | null
  readonly error: ErrorType | null
}

type ListUsersOutput = {
  readonly users: UserModel[] | null
  readonly error: ErrorType | null
}

export type {
  CreateUserOutput,
  GetUserInput,
  GetUserOutput,
  ListUsersOutput
}
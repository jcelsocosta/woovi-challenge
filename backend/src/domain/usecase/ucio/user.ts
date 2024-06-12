import { UserModel } from "../../../internal/database/model/user"
import { ErrorType } from "./error"

type LoginUserInput = {
  readonly email: string
  readonly password: string
}

type LoginUserOutput = {
  readonly token: string | null
  readonly error: ErrorType | null
}

type CreateUserInput = {
  readonly firstName: string
  readonly lastName: string
  readonly CPF: string | null
  readonly CNPJ: string | null
  readonly email: string
  readonly password: string
  readonly repeatPassword: string
}

type CreateUserOutput = {
  readonly token: string | null
  readonly error: ErrorType | null
}

type GetUserInput = {
  readonly userID: string
}

type GetUserOutput = {
  readonly user: UserModel | null
  readonly error: ErrorType | null
}

type ListUsersInput = {
  readonly accountID: string
}

type ListUsersOutput = {
  readonly users: UserModel[] | null
  readonly error: ErrorType | null
}

export type {
  LoginUserInput,
  LoginUserOutput,
  CreateUserInput,
  CreateUserOutput,
  GetUserInput,
  GetUserOutput,
  ListUsersInput,
  ListUsersOutput
}
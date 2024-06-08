import { UserModel } from "../../internal/database/model/user";
import { getUserValidate } from "../../internal/validate/user";
import { appDataSource } from "../../main";
import { CreateUserOutput, GetUserInput, GetUserOutput, ListUsersOutput } from "./ucio/user";
import { v4 } from 'uuid'
import { toUserModel } from "../../internal/database/model/transformer/user";
import { ErrorCodeEnum, ErrorMessageEnum } from "./enum/error";
import { Repository } from "typeorm";

class UserUseCase {
  private userMongoRepository: Repository<UserModel>

  constructor() {
    this.userMongoRepository = appDataSource.getRepository(UserModel)
  }

  async createUserUseCase(): Promise<CreateUserOutput> {
    try {
      const userID = v4()
      const model = new UserModel(null, userID)
      const user = await this.userMongoRepository.save(model)

      const output: CreateUserOutput = {
        user: toUserModel(user),
        error: null
      }

      return output
    } catch (err: any) {
      console.log('Error: ', err)
      const output: CreateUserOutput = {
        user: null,
        error: {
          code: ErrorCodeEnum.INTERNAL, message: ErrorMessageEnum.INTERNAL
        }
      }

      return output
    }
  }

  async getUserUseCase(input: GetUserInput): Promise<GetUserOutput> {
    try {
      const errorMessage = getUserValidate(input)

      if (errorMessage) {
        console.log('Error: ', errorMessage)
        const output: GetUserOutput = {
          user: null,
          error: { code: ErrorCodeEnum.PRECONDITIONAL, message: errorMessage }
        }

        return output
      }

      const user = await this.userMongoRepository.findOne({ where: { userID: input.userID } })

      const output: GetUserOutput = {
        user: user ? toUserModel(user) : null,
        error: null
      }

      return output
    } catch (err: any) {
      console.log('Error: ', err)
      const output: GetUserOutput = {
        user: null,
        error: {
          code: ErrorCodeEnum.INTERNAL,
          message: ErrorMessageEnum.INTERNAL
        }
      }

      return output
    }
  }

  async listUsersUseCase(): Promise<ListUsersOutput> {
    try {

      const users = await this.userMongoRepository.find()

      const output: ListUsersOutput = {
        users: users ? users.map((user) => toUserModel(user)) : null,
        error: null
      }

      return output
    } catch (err: any) {
      console.log('Error: ', err)
      const output: ListUsersOutput = {
        users: null,
        error: {
          code: ErrorCodeEnum.INTERNAL,
          message: ErrorMessageEnum.INTERNAL
        }
      }

      return output
    }
  }
}
export {
  UserUseCase
}
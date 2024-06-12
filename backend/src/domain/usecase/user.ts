import { UserModel } from "../../internal/database/model/user";
import { createUserValidate, getUserValidate, loginUserValidate } from "../../internal/validate/user";
import { appDataSource } from "../../main";
import { CreateUserInput, CreateUserOutput, GetUserInput, GetUserOutput, ListUsersOutput, LoginUserInput, LoginUserOutput } from "./ucio/user";
import { v4 } from 'uuid'
import { toUserModel } from "../../internal/database/model/transformer/user";
import { ErrorCodeEnum, ErrorMessageEnum } from "./enum/error";
import { Repository } from "typeorm";
import { AccountModel } from "../../internal/database/model/account";
import * as bcrypt from 'bcrypt'
import { signJWT } from "../../internal/utils/jsonwebtoken";
import { TaxModel } from "../../internal/database/model/tax";
import { AccountBalanceModel } from "../../internal/database/model/account_balance";

class UserUseCase {
  private userMongoRepository: Repository<UserModel>
  private accountMongoRepository: Repository<AccountModel>
  private taxMongoRepository: Repository<TaxModel>
  private accountBalanceMongoRepository: Repository<AccountBalanceModel>

  constructor() {
    this.userMongoRepository = appDataSource.getRepository(UserModel)
    this.accountMongoRepository = appDataSource.getRepository(AccountModel)
    this.taxMongoRepository = appDataSource.getRepository(TaxModel)
    this.accountBalanceMongoRepository = appDataSource.getRepository(AccountBalanceModel)
  }

  async createUserUseCase(input: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const errorMessage = createUserValidate(input)

      if (errorMessage) {
        console.log(errorMessage)
        const output: CreateUserOutput = {
          token: null,
          error: { code: ErrorCodeEnum.PRECONDITIONAL, message: errorMessage }
        }
        return output
      } else if (!errorMessage) {
        const existEmail = await this.userMongoRepository.findOne({ where: { email: input.email }})

        if (existEmail) {
          console.log('Error: ', 'O email já foi cadastrado.')
          const output: CreateUserOutput = {
            token: null,
            error: { code: ErrorCodeEnum.PRECONDITIONAL, message: 'O email já foi cadastrado.' }
          }
          return output
        }

        const userID = v4()
        const now = new Date()
        const hash = await bcrypt.hash(input.password, 5)

        const taxID = v4()
        const taxModel = new TaxModel(
          taxID,
          now,
          now,
          now,
          input.CPF,
          input.CNPJ
        )

        const userModel = new UserModel(
          userID, now, now, now, input.firstName,
          taxID, input.lastName, input.email, hash
        )

        const accountID = v4()
        const accountModel = new AccountModel(
          accountID,
          now,
          now,
          now,
          userID
        )

        const accountBalanceID = v4()
        const accountBalanceModel = new AccountBalanceModel(
          accountBalanceID,
          now,
          now,
          now,
          accountID,
          50000
        )
        const tax = await this.taxMongoRepository.save(taxModel)

        const user = await this.userMongoRepository.save(userModel)

        const account = await this.accountMongoRepository.save(accountModel)
        
        const accountBalance = await this.accountBalanceMongoRepository.save(accountBalanceModel)

        const tokenParams = {
          email: user.email,
          accountID: account.accountID
        }

        const token = await signJWT(JSON.stringify(tokenParams))
        
        const output: CreateUserOutput = {
          token,
          error: null
        }

        return output
      }
      
      const output: CreateUserOutput = {
        token: null,
        error: null
      }
      return output
    } catch (err: any) {
      console.log('Error: ', err)
      const output: CreateUserOutput = {
        token: null,
        error: {
          code: ErrorCodeEnum.INTERNAL, message: ErrorMessageEnum.INTERNAL
        }
      }

      return output
    }
  }

  async loginUserUseCase(input: LoginUserInput): Promise<LoginUserOutput> {
    try {
      const errorMessage = loginUserValidate(input)

      if (errorMessage) {
        console.log(errorMessage)
        const output: LoginUserOutput = {
          token: null,
          error: { code: ErrorCodeEnum.PRECONDITIONAL, message: errorMessage }
        }
        return output
      } else if (!errorMessage) {
        const user = await this.userMongoRepository.findOne({where: {email: input.email } })

        if (user && await bcrypt.compare(input.password, user.password as string)) {
          const account = await this.accountMongoRepository.findOne({where: { userID: user.userID }})
          
          if (account) {
            const tokenParams = {
              email: user.email,
              accountID: account.accountID
            }
    
            const token = await signJWT(JSON.stringify(tokenParams))
            
            const output: LoginUserOutput = {
              token,
              error: null
            }

            return output
          } else if (!account) {
            const output: LoginUserOutput = {
              token: null,
              error: null
            }
      
            return output
          }
        }

        const output: LoginUserOutput = {
          token: null,
          error: null
        }
  
        return output
      } 

      const output: LoginUserOutput = {
        token: null,
        error: null
      }

      return output
    } catch (err) {
      console.log('Error: ', err)
      const output: LoginUserOutput = {
        token: null,
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
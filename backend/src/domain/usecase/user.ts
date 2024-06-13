import { UserModel } from "../../internal/database/model/user";
import { createUserValidate, getUserValidate, loginUserValidate } from "../../internal/validate/user";
import { appDataSource } from "../../main";
import { CreateUserInput, CreateUserOutput, GetUserInput, GetUserOutput, ListUsersInput, ListUsersOutput, LoginUserInput, LoginUserOutput } from "./ucio/user";
import { v4 } from 'uuid'
import { toUserModel } from "../../internal/database/model/transformer/user";
import { ErrorCodeEnum, ErrorMessageEnum } from "./enum/error";
import { Repository } from "typeorm";
import { AccountModel } from "../../internal/database/model/account";
import * as bcrypt from 'bcrypt'
import { signJWT } from "../../internal/utils/jsonwebtoken";
import { TaxModel } from "../../internal/database/model/tax";
import { AccountBalanceModel } from "../../internal/database/model/account_balance";
import { dateNow } from "../../internal/utils/date";

class UserUseCase {
  private userRepository: Repository<UserModel>
  private accountRepository: Repository<AccountModel>
  private taxRepository: Repository<TaxModel>
  private accountBalanceRepository: Repository<AccountBalanceModel>

  constructor() {
    this.userRepository = appDataSource.getMongoRepository(UserModel)
    this.accountRepository = appDataSource.getMongoRepository(AccountModel)
    this.taxRepository = appDataSource.getMongoRepository(TaxModel)
    this.accountBalanceRepository = appDataSource.getMongoRepository(AccountBalanceModel)
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
        const existEmail = await this.userRepository.findOne({ where: { email: input.email }})

        if (existEmail) {
          console.log('Error: ', 'O email já foi cadastrado.')
          const output: CreateUserOutput = {
            token: null,
            error: { code: ErrorCodeEnum.PRECONDITIONAL, message: 'O email já foi cadastrado.' }
          }
          return output
        }
        const CPF = input.CPF ? input.CPF.replace(/\D/g, '') : null 
        const CNPJ = input.CNPJ ? input.CNPJ.replace(/\D/g, '') : null 
        let existTax
        if (CPF) {
          existTax = await this.taxRepository.findOne({
            where:{ cpf: CPF}})
        } else if (CNPJ) {
          existTax = await this.taxRepository.findOne({
            where:{ cnpj: CNPJ}})
        }

        if (existTax) {
          console.log('Error: ', 'O cpf/cnpj já foi cadastrado.')
          const output: CreateUserOutput = {
            token: null,
            error: { code: ErrorCodeEnum.PRECONDITIONAL, message: 'O cpf/cnpj já foi cadastrado.' }
          }
          return output
        }
        const now = dateNow()
        const hash = await bcrypt.hash(input.password, 5)

        const taxID = v4()
        const taxModel = new TaxModel(
          taxID,
          now,
          now,
          now,
          CPF,
          CNPJ 
        )

        const userID = v4()
        const userModel = new UserModel(
          userID,
          now,
          now,
          now,
          taxID,
          input.firstName,
          input.lastName,
          input.email,
          hash
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
        const tax = await this.taxRepository.save(taxModel)

        const user = await this.userRepository.save(userModel)

        const account = await this.accountRepository.save(accountModel)
        
        const accountBalance = await this.accountBalanceRepository.save(accountBalanceModel)

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
        const user = await this.userRepository.findOne({where: {email: input.email } })

        if (user && await bcrypt.compare(input.password, user.password as string)) {
          const account = await this.accountRepository.findOne({where: { userID: user.userID }})
          
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

      const user = await this.userRepository.findOne({ where: { userID: input.userID } })

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

  async listUsersUseCase(input: ListUsersInput): Promise<ListUsersOutput> {
    try {
      const result = await Promise.all([
        this.accountRepository.findOne({where: {accountID: input.accountID}}),
        this.userRepository.find()
      ])
      const account = result[0]
      const users = result[1]

      const usersResponse = users.filter((el) => el.userID !== account?.userID)

      const output: ListUsersOutput = {
        users: usersResponse ? usersResponse.map((user) => toUserModel(user)) : null,
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
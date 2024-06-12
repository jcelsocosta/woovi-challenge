import { Repository } from "typeorm"
import { AccountBalanceModel } from "../../internal/database/model/account_balance"
import { getAccountBalanceByAccountIDValidate } from "../../internal/validate/account_balance"
import { appDataSource } from "../../main"
import { ErrorCodeEnum, ErrorMessageEnum } from "./enum/error"
import { GetAccountBalanceByAccountIDInput, GetAccountBalanceByAccountIDOutput } from "./ucio/account_balance"

class AccountBalanceUseCase {
  private accountBalanceMongoRepository: Repository<AccountBalanceModel>

  constructor() {
    this.accountBalanceMongoRepository = appDataSource.getRepository(AccountBalanceModel)
  }

  async getAccountBalanceByAccountID(input: GetAccountBalanceByAccountIDInput): Promise<GetAccountBalanceByAccountIDOutput> {
    try {
      const errorMessage = getAccountBalanceByAccountIDValidate(input)

      if (errorMessage) {
        console.log("Error", errorMessage)
        const output: GetAccountBalanceByAccountIDOutput = {
          value: null,
          error: { code: ErrorCodeEnum.PRECONDITIONAL, message: errorMessage }
        }
  
        return output

      } else if (!errorMessage) {
        const accountBalance = await this.accountBalanceMongoRepository.findOne({where: {accountID: input.accountID}})

        const output: GetAccountBalanceByAccountIDOutput = {
          value: accountBalance ? accountBalance.value : 0,
          error: null
        }
  
        return output
      }

      const output: GetAccountBalanceByAccountIDOutput = {
        value: null,
        error: null
      }

      return output
      
    } catch (err: any) {
      console.log('Error: ', err)
      const output: GetAccountBalanceByAccountIDOutput = {
        value: null,
        error: {
          code: ErrorCodeEnum.INTERNAL, message: ErrorMessageEnum.INTERNAL
        }
      }

      return output
    }
  }
}

export {
  AccountBalanceUseCase
}
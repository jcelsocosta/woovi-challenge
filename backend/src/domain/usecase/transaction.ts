import { ErrorCodeEnum, ErrorMessageEnum } from "./enum/error"
import { CreateTransactionInput, CreateTransactionOutput } from './ucio/transaction'
import { createTransactionValidate } from '../../internal/validate/transaction'
import { v4 } from "uuid"
import { TransactionModel } from "../../internal/database/model/transaction"
import { appDataSource } from "../../main"
import { Repository } from "typeorm"
import { AccountBalanceModel } from "../../internal/database/model/account_balance"
import { AccountModel } from "../../internal/database/model/account"

class TransactionUseCase {
  private transactionRepository: Repository<TransactionModel>
  private accountBalanceRepository: Repository<AccountBalanceModel>
  private accountRepository: Repository<AccountModel>
  constructor() {
    this.transactionRepository = appDataSource.getMongoRepository(TransactionModel)
    this.accountBalanceRepository = appDataSource.getMongoRepository(AccountBalanceModel)
    this.accountRepository = appDataSource.getMongoRepository(AccountModel)
  }
  
  async createTransaction(input: CreateTransactionInput): Promise<CreateTransactionOutput> {
    try {
      const errorMessage = createTransactionValidate(input)

      if (errorMessage) {
        console.log('Error', errorMessage)
        const output: CreateTransactionOutput = {
          transaction: null,
          error: { code: ErrorCodeEnum.PRECONDITIONAL, message: errorMessage }
        }

        return output
      } else if (!errorMessage) {
        const receivedUser = await this.accountRepository.findOne({where: {userID: input.receivedUserID}})

        if (!receivedUser) {
          const msgError = 'O destinatário não foi encontrado'
          console.log('Error', errorMessage)
          const output: CreateTransactionOutput = {
            transaction: null,
            error: { code: ErrorCodeEnum.PRECONDITIONAL, message: msgError }
          }

          return output
        } else if (receivedUser) {
          const result = await Promise.all([
            this.accountBalanceRepository.findOne({where: { accountID: input.senderAccountID }}),
            this.accountBalanceRepository.findOne({where: {accountID: receivedUser.accountID}})
          ])
          const sendAccountBalance = result[0]
          const receivedAccountBalance = result[1]
          if (sendAccountBalance && sendAccountBalance.value < input.value) {
            const msgError = 'O seu saldo é insuficiente'
            console.log('Error', msgError)
            const output: CreateTransactionOutput = {
              transaction: null,
              error: { code: ErrorCodeEnum.PRECONDITIONAL, message: msgError }
            }
            return output
          } else if (sendAccountBalance && receivedAccountBalance && sendAccountBalance.value >= input.value) {
            const now = new Date()
            const transactionID = v4()
            const transactionModel = new TransactionModel(
              transactionID,
              now,
              now,
              now,
              input.senderAccountID,
              input.receivedUserID,
              input.value,
              'done'
            )
  
            const sendAccountModel = new AccountBalanceModel(
              sendAccountBalance.accountBalanceID,
              sendAccountBalance.createdAt,
              now,
              sendAccountBalance.createdDate,
              sendAccountBalance.accountID,
              sendAccountBalance.value - input.value
            )
  
            const receivedAccountModel = new AccountBalanceModel(
              receivedAccountBalance.accountBalanceID,
              receivedAccountBalance.createdAt,
              now,
              receivedAccountBalance.createdDate,
              receivedAccountBalance.accountID,
              receivedAccountBalance.value + input.value
            )
  
            const respose = await Promise.all([
              this.accountBalanceRepository.save(sendAccountModel),
              this.accountBalanceRepository.save(receivedAccountModel),
              this.transactionRepository.save(transactionModel)
            ])
    
            const output: CreateTransactionOutput = {
              transaction: respose[2],
              error: null
            }
    
            return output
          }
        }
      }

      const output: CreateTransactionOutput = {
        transaction: null,
        error: null
      }

      return output
    } catch (err: any) {
      console.log('Error ', err)
      const output: CreateTransactionOutput = { 
        transaction: null,
        error: { code: ErrorCodeEnum.INTERNAL, message: ErrorMessageEnum.INTERNAL}
      }

      return output
    }

  }
}

export {
  TransactionUseCase
}
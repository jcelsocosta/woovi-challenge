import { ErrorCodeEnum, ErrorMessageEnum } from "./enum/error"
import { CreateTransactionInput, CreateTransactionOutput, LisTransactionsByAccountIDOutput, ListTransactionsByAccountIDInput } from './ucio/transaction'
import { createTransactionValidate, listTransactionsByAccountIDValidate } from '../../internal/validate/transaction'
import { v4 } from "uuid"
import { TransactionModel } from "../../internal/database/model/transaction"
import { appDataSource } from "../../main"
import { Repository } from "typeorm"
import { AccountBalanceModel } from "../../internal/database/model/account_balance"
import { AccountModel } from "../../internal/database/model/account"
import crypto from 'crypto'
import { dateNow } from "../../internal/utils/date"
import moment from "moment"

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
        const result = await Promise.all([
          this.accountRepository.findOne({where: { accountID: input.senderAccountID }}),
          this.accountRepository.findOne({where: { userID: input.receivedUserID }})
        ])

        const senderAccountExist = result[0]
        const receivedAccount = result[1]

        if (!senderAccountExist) {
          const msgError = 'O remetente não foi encontrado'
          console.log('Error', errorMessage)
          const output: CreateTransactionOutput = {
            transaction: null,
            error: { code: ErrorCodeEnum.PRECONDITIONAL, message: msgError }
          }

          return output
        }

        if (!receivedAccount) {
          const msgError = 'O destinatário não foi encontrado'
          console.log('Error', errorMessage)
          const output: CreateTransactionOutput = {
            transaction: null,
            error: { code: ErrorCodeEnum.PRECONDITIONAL, message: msgError }
          }

          return output
        } else if (receivedAccount) {
          const result = await Promise.all([
            this.accountBalanceRepository.findOne({where: { accountID: input.senderAccountID }}),
            this.accountBalanceRepository.findOne({where: { accountID: receivedAccount.accountID }})
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
            const combined = input.senderAccountID + input.receivedUserID + input.value
            const idempotencyKey = crypto.createHash('sha256').update(combined).digest('hex')

            const transaction = await this.transactionRepository.findOne({ where: { idempotencyKey: idempotencyKey }, order: { createdDate: 'DESC' }})
            // console.log('p1', moment().format(transaction?.createdDate.toString()))
            // console.log('p2', moment().subtract(3, 'minutes').format())
            // console.log('date', moment().format(transaction?.createdDate.toString()) >= moment().subtract(3, 'minutes').format())
            if (transaction && (moment().format(transaction.createdDate.toString()) >= moment().add(1, 'minutes').format())) {
              const output: CreateTransactionOutput = {
                transaction: transaction,
                error: null
              }
      
              return output
            } else {
              const now = dateNow()
              const transactionID = v4()
              const transactionModel = new TransactionModel(
                transactionID,
                now,
                now,
                now,
                input.senderAccountID,
                receivedAccountBalance.accountID,
                input.value,
                'done',
                idempotencyKey
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
                this.accountBalanceRepository.update({
                  accountBalanceID: sendAccountModel.accountBalanceID
                },{...sendAccountModel}),
                this.accountBalanceRepository.update({
                  accountBalanceID: receivedAccountModel.accountBalanceID
                }, {...receivedAccountModel}),
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

  async listTransactionsByAccountID(input: ListTransactionsByAccountIDInput): Promise<LisTransactionsByAccountIDOutput> {
    try {
      const errorMessage = listTransactionsByAccountIDValidate(input)

      if (errorMessage) {
        console.log('Error', errorMessage)
        const output: LisTransactionsByAccountIDOutput = { 
          transactions: null,
          error: { code: ErrorCodeEnum.PRECONDITIONAL, message: errorMessage }
        }
  
        return output
      } else if (!errorMessage) {
        const transactions = await this.transactionRepository.find({
          where:{
          $or: [
            { receivedAccountID: input.accountID },
            { senderAccountID: input.accountID }
          ]} as any
        })

        const transactionsFormatted = transactions.map((el) => {
          return {
            received: el.receivedAccountID === input.accountID ? 1 : 2,
            sender: el.senderAccountID === input.accountID ? 1 : 2,
            ...el
          }
        })
        //console.log(transactionsFormatted)
        const output: LisTransactionsByAccountIDOutput = { 
          transactions: transactionsFormatted,
          error: null
        }
  
        return output  
      }
 
      const output: LisTransactionsByAccountIDOutput = { 
        transactions: null,
        error: null
      }

      return output
    } catch (err: any) {
      console.log('Error ', err)
      const output: LisTransactionsByAccountIDOutput = { 
        transactions: null,
        error: { code: ErrorCodeEnum.INTERNAL, message: ErrorMessageEnum.INTERNAL}
      }

      return output
    }
  }
}

export {
  TransactionUseCase
}
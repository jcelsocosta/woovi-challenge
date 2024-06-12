import { TransactionUseCase } from "../../../../domain/usecase/transaction"
import { CreateTransactionInput, CreateTransactionOutput } from "../../../../domain/usecase/ucio/transaction"
import {GraphQLString} from 'graphql'
import { createTransactionType } from "../type/transaction"

const createTransaction = {
  name: 'createTransaction',
  type: createTransactionType,
  args: {
    receivedUserID: { type: GraphQLString}
  },
  resolve: async (_: any, args: any): Promise<CreateTransactionOutput> => {
    const {
      accountID,
      receivedUserID,
      value
    } = args

    const input: CreateTransactionInput = {
      senderAccountID: accountID,
      receivedUserID,
      value
    }
    return await new TransactionUseCase().createTransaction(input)
  }
}

export {
  createTransaction
}
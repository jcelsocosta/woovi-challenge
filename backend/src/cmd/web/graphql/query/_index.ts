import { GraphQLObjectType } from 'graphql';
import { getUser, listUsers } from './user'
import { getAccountBalanceByAccountID } from './account_balance'
import { listTransactionsByAccountID } from './transaction'

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getUser,
    listUsers,
    getAccountBalanceByAccountID,
    listTransactionsByAccountID
  }
})

export {
  rootQuery
}
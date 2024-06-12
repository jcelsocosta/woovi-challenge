import { GraphQLObjectType } from 'graphql';
import { getUser, listUsers } from './user'
import { getAccountBalanceByAccountID } from './account_balance'
const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getUser,
    listUsers,
    getAccountBalanceByAccountID
  }
})

export {
  rootQuery
}
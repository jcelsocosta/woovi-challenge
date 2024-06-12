import { GraphQLObjectType } from 'graphql';
import { createUser, loginUser } from './user'
import { createTransaction } from './transaction'

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    loginUser,
    createUser,
    createTransaction
  }
})

export {
  rootMutation
}
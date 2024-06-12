import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';
import { errorType } from './error';

const transactionType = new GraphQLObjectType({
  name: 'transactionType',
  fields: {
    transactionID: { type: GraphQLString },
    value: { type: GraphQLInt },
    status: { type: GraphQLString }
  },
})

const createTransactionType = new GraphQLObjectType({
  name: 'createTransactionType',
  fields: {
    transaction: { type: transactionType },
    error: { type: errorType }
  }
})

export {
  createTransactionType
}
import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } from 'graphql';
import { errorType } from './error';

const transactionType = new GraphQLObjectType({
  name: 'transactionType',
  fields: {
    transactionID: { type: GraphQLString },
    value: { type: GraphQLInt },
    status: { type: GraphQLString },
    sender: { type: GraphQLInt },
    received: { type: GraphQLInt }
  },
})

const createTransactionType = new GraphQLObjectType({
  name: 'createTransactionType',
  fields: {
    transaction: { type: transactionType },
    error: { type: errorType }
  }
})

const listTransactionsByAccountIDType = new GraphQLObjectType({
  name: 'listTransactionsByAccountIDType',
  fields: {
    transactions: { type: new GraphQLList(transactionType) },
    error: { type: errorType }
  }
})


export {
  createTransactionType,
  listTransactionsByAccountIDType
}
import { GraphQLObjectType, GraphQLInt } from 'graphql';
import { errorType } from './error';

const getAccountBalanceByAccountIDType = new GraphQLObjectType({
  name: 'getAccountBalanceByAccountIDType',
  fields: {
    value: { type: GraphQLInt },
    error: { type: errorType }
  }
})

export {
  getAccountBalanceByAccountIDType
}
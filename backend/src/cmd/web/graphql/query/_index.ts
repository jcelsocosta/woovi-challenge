import { GraphQLObjectType } from 'graphql';
import { getUser, listUsers } from './user'

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getUser,
    listUsers
  }
})

export {
  rootQuery
}
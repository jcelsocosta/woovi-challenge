import { GraphQLObjectType } from 'graphql';
import { createUser, loginUser } from './user'

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    loginUser,
    createUser
  }
})

export {
  rootMutation
}
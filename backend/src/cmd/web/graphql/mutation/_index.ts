import { GraphQLObjectType } from 'graphql';
import { createUser } from './user'

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser
  }
})

export {
  rootMutation
}
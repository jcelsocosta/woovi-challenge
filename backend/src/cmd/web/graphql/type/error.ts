import { GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql'

const errorType = new GraphQLObjectType({
  name: 'errorType',
  fields: {
    code: {
      type: GraphQLInt
    },
    message: {
      type: GraphQLString
    }
  }
})

export { errorType }

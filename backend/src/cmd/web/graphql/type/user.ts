import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { errorType } from './error';

const userType = new GraphQLObjectType({
  name: 'user',
  fields: {
    userID: { type: GraphQLString }
  },
});

const getUserType = new GraphQLObjectType({
  name: 'getUserType',
  fields: {
    user: { type: userType },
    error: { type: errorType }
  }
})

const listUsersType = new GraphQLObjectType({
  name: 'listUsersType',
  fields: {
    users: { type: new GraphQLList(userType) },
    error: { type: errorType }
  }
})

const createUserType = new GraphQLObjectType({
  name: 'createUserType',
  fields: {
    user: { type: userType },
    error: { type: errorType }
  }
})

export {
  userType,
  createUserType,
  getUserType,
  listUsersType
}
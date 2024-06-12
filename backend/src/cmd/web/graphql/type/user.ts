import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { errorType } from './error';

const userType = new GraphQLObjectType({
  name: 'userType',
  fields: {
    userID: { type: GraphQLString }
  },
});


const createUserType = new GraphQLObjectType({
  name: 'createUserType',
  fields: {
    token: { type: GraphQLString },
    error: { type: errorType }
  }
})

const loginUserType = new GraphQLObjectType({
  name: 'loginUserType',
  fields: {
    token: { type: GraphQLString},
    error: { type: errorType }
  }
})

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

export {
  userType,
  loginUserType,
  createUserType,
  getUserType,
  listUsersType
}
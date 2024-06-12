import { GraphQLSchema } from 'graphql';
import { rootMutation } from './mutation/_index';
import { rootQuery } from './query/_index';

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation

})

export {
  schema
}
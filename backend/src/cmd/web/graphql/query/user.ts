import { GraphQLString } from 'graphql';
import { GetUserInput, GetUserOutput, ListUsersOutput } from '../../../../domain/usecase/ucio/user';
import { UserUseCase } from '../../../../domain/usecase/user';
import { getUserType, listUsersType } from '../type/user';

const getUser = {
  name: 'getUser',
  type: getUserType,
  args: {
    userID: { type: GraphQLString }
  },
  resolve: async (_: any, args: any): Promise<GetUserOutput> => {
    const input: GetUserInput = {
      userID: args.userID
    };
    return await new UserUseCase().getUserUseCase(input);
  },
}

const listUsers = {
  name: 'listUsers',
  type: listUsersType,
  args: {},
  resolve: async (_: any, args: any): Promise<ListUsersOutput> => {
    return await new UserUseCase().listUsersUseCase();
  },
}

export {
  getUser,
  listUsers
}
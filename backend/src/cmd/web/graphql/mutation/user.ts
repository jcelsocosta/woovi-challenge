import { CreateUserInput, CreateUserOutput, LoginUserInput, LoginUserOutput } from '../../../../domain/usecase/ucio/user';
import { UserUseCase } from '../../../../domain/usecase/user';
import { createUserType, loginUserType } from '../type/user';
import { GraphQLString } from 'graphql';

const createUser = {
  name: 'createUser',
  type: createUserType,
  args: {
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    CPF: { type: GraphQLString},
    CNPJ: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    repeatPassword: { type: GraphQLString}
  },
  resolve: async (_: any, args: any): Promise<CreateUserOutput> => {
    const {
      firstName,
      lastName,
      CPF,
      CNPJ,
      email,
      password,
      repeatPassword
    } = args

    const input: CreateUserInput = {
      firstName,
      lastName,
      CPF,
      CNPJ,
      email,
      password,
      repeatPassword
    }
    return await new UserUseCase().createUserUseCase(input)
  }
}

const loginUser = {
  name: 'loginUser',
  type: loginUserType,
  args: {
    email: { type: GraphQLString},
    password: { type: GraphQLString }
  },
  resolve: async (_: any, args: any): Promise<LoginUserOutput> => {
    const {
      email,
      password
    } = args

    const input: LoginUserInput = {
      email,
      password
    }
    return await new UserUseCase().loginUserUseCase(input)
  }
}

export {
  createUser,
  loginUser
}
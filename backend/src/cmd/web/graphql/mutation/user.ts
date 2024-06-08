import { CreateUserOutput } from '../../../../domain/usecase/ucio/user';
import { UserUseCase } from '../../../../domain/usecase/user';
import { createUserType } from '../type/user';

const createUser = {
  name: 'createUser',
  type: createUserType,
  fields: {
    createUser: {
      type: createUserType,
      resolve: async (_: any, args: any): Promise<CreateUserOutput> => {
        return await new UserUseCase().createUserUseCase()
      }
    }
  }
}

export {
  createUser
}
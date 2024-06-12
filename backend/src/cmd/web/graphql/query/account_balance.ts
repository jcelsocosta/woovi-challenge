import { AccountBalanceUseCase } from '../../../../domain/usecase/account_balance';
import { GetAccountBalanceByAccountIDInput, GetAccountBalanceByAccountIDOutput } from '../../../../domain/usecase/ucio/account_balance';
import { getAccountBalanceByAccountIDType } from '../type/account_balance';

const getAccountBalanceByAccountID = {
  name: 'getAccountBalanceByAccountID',
  type: getAccountBalanceByAccountIDType,
  args: {},
  resolve: async (_: any, args: any): Promise<GetAccountBalanceByAccountIDOutput> => {
    const input: GetAccountBalanceByAccountIDInput = {
      accountID: '7a102ebe-0b14-46f3-a506-7521f8b38515'
    };
    return await new AccountBalanceUseCase().getAccountBalanceByAccountID(input);
  },
}

export {
  getAccountBalanceByAccountID
}
import { AccountBalanceUseCase } from '../../../../domain/usecase/account_balance';
import { GetAccountBalanceByAccountIDInput, GetAccountBalanceByAccountIDOutput } from '../../../../domain/usecase/ucio/account_balance';
import { getAccountBalanceByAccountIDType } from '../type/account_balance';

const getAccountBalanceByAccountID = {
  name: 'getAccountBalanceByAccountID',
  type: getAccountBalanceByAccountIDType,
  args: {},
  resolve: async (_: any, args: any, ctx: any): Promise<GetAccountBalanceByAccountIDOutput> => {
    const { accountID } = ctx
    const input: GetAccountBalanceByAccountIDInput = {
      accountID
    };
    return await new AccountBalanceUseCase().getAccountBalanceByAccountID(input);
  },
}

export {
  getAccountBalanceByAccountID
}
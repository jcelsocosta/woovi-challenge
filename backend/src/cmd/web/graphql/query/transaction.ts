import { TransactionUseCase } from '../../../../domain/usecase/transaction';
import { ListTransactionsByAccountIDInput, LisTransactionsByAccountIDOutput } from '../../../../domain/usecase/ucio/transaction';
import { listTransactionsByAccountIDType } from '../type/transaction';

const listTransactionsByAccountID = {
  name: 'listTransactionsByAccountID',
  type: listTransactionsByAccountIDType,
  args: {},
  resolve: async (_: any, args: any, ctx: any): Promise<LisTransactionsByAccountIDOutput> => {
    const { accountID } = ctx
    const input: ListTransactionsByAccountIDInput = {
      accountID
    };
    return await new TransactionUseCase().listTransactionsByAccountID(input);
  },
}

export {
  listTransactionsByAccountID
}
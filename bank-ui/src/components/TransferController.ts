import { fetchQueryGraphql } from '@/utils/queryRelay'

class TransferController {
  async getAccountBalanceByAccountID(operation: any): Promise<any> {
    return await fetchQueryGraphql(operation)
  }

  async listUsers(operation: any): Promise<any> {
    return await fetchQueryGraphql(operation)
  }

  async createTranscation(operation: any): Promise<any> {
    return await fetchQueryGraphql(operation)
  }
}

const transferController = new TransferController()

export { transferController }

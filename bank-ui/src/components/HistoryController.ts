import { fetchQueryGraphql } from '@/utils/queryRelay'

class HistoryController {
  async listTransactionsByAccountID(operation: any): Promise<any> {
    return await fetchQueryGraphql(operation)
  }
}

const historyController = new HistoryController()

export { historyController }

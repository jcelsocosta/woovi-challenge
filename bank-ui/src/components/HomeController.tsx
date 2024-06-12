import { fetchQueryGraphql } from '@/utils/queryRelay'

class HomeController {
  async getAccountBalanceByAccountID(operation: any): Promise<any> {
    return await fetchQueryGraphql(operation)
  }
}

const homeController = new HomeController()

export { homeController }

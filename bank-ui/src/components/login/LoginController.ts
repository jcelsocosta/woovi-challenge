import { fetchQueryGraphql } from '@/utils/queryRelay'

class LoginController {
  async login(operation: any): Promise<any> {
    return await fetchQueryGraphql(operation)
  }
}

const loginController = new LoginController()

export { loginController }

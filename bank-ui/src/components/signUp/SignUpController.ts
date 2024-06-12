import { fetchQueryGraphql } from '@/utils/queryRelay'

class SignUpController {
  async createSignUp(operation: any): Promise<any> {
    return await fetchQueryGraphql(operation)
  }
}

const signUpController = new SignUpController()

export { signUpController }

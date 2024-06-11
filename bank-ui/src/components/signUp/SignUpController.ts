class SignUpController {
  async createSignUp(args: any): Promise<any> {
    console.log('ARGS', args)
  }
}

const signUpController = new SignUpController()

export {
  signUpController
}
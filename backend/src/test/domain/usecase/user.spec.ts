import { expect, test } from 'vitest'
import { CreateUserInput, LoginUserInput } from '../../../domain/usecase/ucio/user'
import { signJWT } from '../../../internal/utils/jsonwebtoken'
import { createUserValidate, loginUserValidate } from '../../../internal/validate/user'
import { usersMock } from '../../mock/user'
import * as bcrypt from 'bcrypt'
import { accountsMock } from '../../mock/account'
import { taxesMock } from '../../mock/tax'
import { dateNow } from '../../../internal/utils/date'
import { v4 } from 'uuid'
import { TaxModel } from '../../../internal/database/model/tax'
import { UserModel } from '../../../internal/database/model/user'
import { AccountModel } from '../../../internal/database/model/account'
import { AccountBalanceModel } from '../../../internal/database/model/account_balance'
import { accountBalancesMock } from '../../mock/account_balance'

test('login success', async () => {
  const input: LoginUserInput = {
    email: 'john.doe@example.com',
    password: '12345678'
  }

  const errorMessage = loginUserValidate(input)

  if (!errorMessage) {
    const user = usersMock.find((el) => el.email === input.email)

    if (!user) {
      expect.fail('Email não cadastrado.')
    }

    if (user && await bcrypt.compare(input.password, user.password as string)) {
      const account = accountsMock.find((el) => el.userID === user.userID)
      if (account) {
        const payload = {
          email: user.email,
          accountID: account.accountID
        }

        const token = await signJWT(JSON.stringify(payload))

        expect(typeof token).toBe('string')

        return
      } else if (!account) {
        expect.fail('Conta não foi encontrada')
      }
    }

    expect.fail('Senha incorreta')
  }
})

test('login fail email not found', async () => {
  const input: LoginUserInput = {
    email: 'john.doee@example.com',
    password: '12345678'
  }

  const errorMessage = loginUserValidate(input)

  if (!errorMessage) {
    const user = usersMock.find((el) => el.email === input.email)

    if (!user) {
      expect(user).toBe(undefined)
    }
  }
})

test('login fail password incorrect', async () => {
  const input: LoginUserInput = {
    email: 'john.doe@example.com',
    password: '123456789'
  }

  const errorMessage = loginUserValidate(input)

  if (!errorMessage) {
    const user = usersMock.find((el) => el.email === input.email)

    if (user && !(await bcrypt.compare(input.password, user.password as string))) {
      expect('password incorrect')
      return
    }
  }
  expect.fail('password correct')
})

test('create user with sucess', async () => {
  const input: CreateUserInput = {
    firstName: 'teste1',
    lastName: 'lastname teste',
    email: 'p@gmail.com',
    CPF: '102.120.333-90',
    CNPJ: '',
    password: '123456',
    repeatPassword: '123456'
  }

  const errorMessage = createUserValidate(input)

  if (errorMessage) {
    expect(errorMessage).toBe('')
  } else if (!errorMessage) {
    const existEmail = usersMock.find((el) => el.email === input.email)

    if (existEmail) {
      expect.fail('O email já foi cadastrado.')
    }

    const CPF = input.CPF ? input.CPF.replace(/\D/g, '') : null 
    const CNPJ = input.CNPJ ? input.CNPJ.replace(/\D/g, '') : null 
    let existTax
    if (CPF) {
      existTax = taxesMock.find((el) => el.cpf === CPF)
    } else if (CNPJ) {
      existTax = taxesMock.find((el) => el.cnpj === CNPJ)
    }

    if (existTax) {
      expect.fail('O cpf/cnpj já foi cadastrado.')
    }

    const now = dateNow()
    const hash = await bcrypt.hash(input.password, 5)
    const taxID = v4()
    const taxModel = new TaxModel(
      taxID,
      now,
      now,
      now,
      CPF,
      CNPJ 
    )
    const userID = v4()
    const userModel = new UserModel(
      userID,
      now,
      now,
      now,
      taxID,
      input.firstName,
      input.lastName,
      input.email,
      hash
    )
    const accountID = v4()
    const accountModel = new AccountModel(
      accountID,
      now,
      now,
      now,
      userID
    )
    const accountBalanceID = v4()
    const accountBalanceModel = new AccountBalanceModel(
      accountBalanceID,
      now,
      now,
      now,
      accountID,
      50000
    )

    taxesMock.push(taxModel)
    usersMock.push(userModel)
    accountsMock.push(accountModel)
    
    accountBalancesMock.push(accountBalanceModel)

    const tokenParams = {
      email: userModel.email,
      accountID: accountModel.accountID
    }

    const newTax = taxesMock.find((el) => el.taxID === taxModel.taxID)
    
    expect(newTax).toBeInstanceOf(TaxModel)

    const newUser = usersMock.find((el) => el.userID === userModel.userID)

    expect(newUser).toBeInstanceOf(UserModel)

    const newAccount = accountsMock.find((el) => el.accountID === accountModel.accountID)

    expect(newAccount).toBeInstanceOf(AccountModel)

    const newAccountBalance = accountBalancesMock.find((el) => el.accountBalanceID === accountBalanceModel.accountBalanceID)

    expect(newAccountBalance).toBeInstanceOf(AccountBalanceModel)

    const token = await signJWT(JSON.stringify(tokenParams))

    expect(typeof token).toBe('string')
  }
})


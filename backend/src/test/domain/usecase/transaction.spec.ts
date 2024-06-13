import { expect, test } from 'vitest'
import { CreateTransactionInput } from '../../../domain/usecase/ucio/transaction'
import { accountsMock } from '../../mock/account'
import { accountBalancesMock } from '../../mock/account_balance'
import crypto from 'crypto'
import { transactionsMock } from '../../mock/transaction'
import moment from "moment"
import { dateNow } from '../../../internal/utils/date'
import { v4 } from 'uuid'
import { TransactionModel } from '../../../internal/database/model/transaction'
import { AccountBalanceModel } from '../../../internal/database/model/account_balance'

test('create transaction', async() => {
  const input: CreateTransactionInput = {
    senderAccountID: '550e8400-e29b-41d4-a716-446655440012',
    receivedUserID: '550e8400-e29b-41d4-a716-446655440000',
    value: 1000
  }

  const receivedAccount = accountsMock.find((el) => el.userID === input.receivedUserID)

  expect(receivedAccount?.userID).toEqual(input.receivedUserID)

  if (receivedAccount) {
    const sendAccountBalance = accountBalancesMock.find((el) => el.accountID === input.senderAccountID)

    expect(sendAccountBalance?.accountID).toEqual(input.senderAccountID)

    const receivedAccountBalance = accountBalancesMock.find((el) => el.accountID === receivedAccount.accountID)

    expect(receivedAccountBalance?.accountID).toEqual(receivedAccount.accountID)

    const combined = input.senderAccountID + input.receivedUserID + input.value
    const idempotencyKey = crypto.createHash('sha256').update(combined).digest('hex')

    const transactionFiltered = transactionsMock.filter((el) => el.idempotencyKey === idempotencyKey)

    const sortedTranscation = transactionFiltered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const transaction = sortedTranscation[0]

    if (transaction && (moment().format(transaction.createdDate.toString()) >= moment().subtract(3, 'minutes').format())) {
      expect.fail('Transação duplicada')
    } else if (receivedAccountBalance && sendAccountBalance) {

      expect(sendAccountBalance.value).toBeGreaterThanOrEqual(input.value)

      const now = dateNow()
      const transactionID = v4()
      const transactionModel = new TransactionModel(
        transactionID,
        now,
        now,
        now,
        input.senderAccountID,
        receivedAccountBalance.accountID,
        input.value,
        'done',
        idempotencyKey
      )
      const sendAccountBalanceModel = new AccountBalanceModel(
        sendAccountBalance.accountBalanceID,
        sendAccountBalance.createdAt,
        now,
        sendAccountBalance.createdDate,
        sendAccountBalance.accountID,
        sendAccountBalance.value - input.value
      )
      const receivedAccountBalanceModel = new AccountBalanceModel(
        receivedAccountBalance.accountBalanceID,
        receivedAccountBalance.createdAt,
        now,
        receivedAccountBalance.createdDate,
        receivedAccountBalance.accountID,
        receivedAccountBalance.value + input.value
      )

      const indexSendAccount = accountBalancesMock.findIndex((el) => el.accountBalanceID === sendAccountBalanceModel.accountBalanceID)
      accountBalancesMock[indexSendAccount] = sendAccountBalanceModel

      const indexReceivedAccount = accountBalancesMock.findIndex((el) => el.accountBalanceID === receivedAccountBalanceModel.accountBalanceID)
      accountBalancesMock[indexReceivedAccount] = receivedAccountBalanceModel

      transactionsMock.push(transactionModel)

      const transactionResult = transactionsMock.find((el) => el.transactionID === transactionModel.transactionID)

      expect(transactionResult?.transactionID).toEqual(transactionModel.transactionID)

      expect(accountBalancesMock[indexReceivedAccount].value).toEqual(receivedAccountBalanceModel.value)

      expect(accountBalancesMock[indexSendAccount].value).toEqual(sendAccountBalanceModel.value)
    }

  } else if (!receivedAccount) {
    expect.fail('O destinatário não foi encontrado')
  }

})
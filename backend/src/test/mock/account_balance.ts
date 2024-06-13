import { AccountBalanceModel } from "../../internal/database/model/account_balance";
import { dateNow } from "../../internal/utils/date";

const now = dateNow()

const accountBalancesMock: AccountBalanceModel[] = [
  {
    accountBalanceID: '550e8400-e29b-41d4-a716-446655440013',
    createdAt: now,
    updatedAt: now,
    createdDate: now,
    accountID: '550e8400-e29b-41d4-a716-446655440010',
    value: 1000
  },
  {
    accountBalanceID: '550e8400-e29b-41d4-a716-446655440014',
    createdAt: now,
    updatedAt: now,
    createdDate: now,
    accountID: '550e8400-e29b-41d4-a716-446655440011',
    value: 2000
  },
  {
    accountBalanceID: '550e8400-e29b-41d4-a716-446655440015',
    createdAt: now,
    updatedAt: now,
    createdDate: now,
    accountID: '550e8400-e29b-41d4-a716-446655440012',
    value: 3000
  }
]

export {
  accountBalancesMock
}
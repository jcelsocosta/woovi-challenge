import { AccountModel } from "../../internal/database/model/account";
import { dateNow } from "../../internal/utils/date";

const now = dateNow()

const accountsMock: AccountModel[] = [
  {
    accountID: '550e8400-e29b-41d4-a716-446655440010',
    createdAt: now,
    updatedAt: now,
    createdDate: now,
    userID: '550e8400-e29b-41d4-a716-446655440000'
  },
  {
    accountID: '550e8400-e29b-41d4-a716-446655440011',
    createdAt: now,
    updatedAt: now,
    createdDate: now,
    userID: '5550e8400-e29b-41d4-a716-446655440002'
  },
  {
    accountID: '550e8400-e29b-41d4-a716-446655440012',
    createdAt: now,
    updatedAt: now,
    createdDate: now,
    userID: '550e8400-e29b-41d4-a716-446655440015'
  }
]

export {
  accountsMock
}
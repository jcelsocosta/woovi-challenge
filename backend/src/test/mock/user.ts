import { UserModel } from "../../internal/database/model/user";
import { dateNow } from "../../internal/utils/date";

const now = dateNow()

const usersMock: UserModel[] = [
  {
    userID: '550e8400-e29b-41d4-a716-446655440000',
    createdAt: now,
    updatedAt: now,
    createdDate: now,
    taxID: '550e8400-e29b-41d4-a716-446655440013',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '$2b$05$iIM1WlufwGtGSgPUnaUxM.AUoOPxfidYVUtAmBzAPUeevFMyMCtDe'
  },
  {
    userID: '550e8400-e29b-41d4-a716-446655440002',
    createdAt: now,
    updatedAt: now,
    createdDate: now,
    taxID: '550e8400-e29b-41d4-a716-446655440014',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    password: '$2b$05$iIM1WlufwGtGSgPUnaUxM.AUoOPxfidYVUtAmBzAPUeevFMyMCtDe'
  },
  {
    userID: '550e8400-e29b-41d4-a716-446655440015',
    createdAt: now,
    updatedAt: now,
    createdDate: now,
    taxID: '550e8400-e29b-41d4-a716-446655440005',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    password: '$2b$05$iIM1WlufwGtGSgPUnaUxM.AUoOPxfidYVUtAmBzAPUeevFMyMCtDe'
  }
]

export {
  usersMock
}
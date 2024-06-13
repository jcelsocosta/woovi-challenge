import { TaxModel } from "../../internal/database/model/tax";
import { dateNow } from "../../internal/utils/date";

const now = dateNow()

const taxesMock: TaxModel[] = [
  {
    taxID: '550e8400-e29b-41d4-a716-446655440013',
    createdAt: now,
    updatedAt: now,
    createdDate: now,
    cpf: '123.456.789-00',
    cnpj: null
  },
  {
    taxID: '550e8400-e29b-41d4-a716-446655440014',
    createdAt: now,
    updatedAt: now,
    createdDate: now,
    cpf: null,
    cnpj: '12.345.678/0001-00'
  },
  {
    taxID: '550e8400-e29b-41d4-a716-446655440015',
    createdAt: now,
    updatedAt: now,
    createdDate: now,
    cpf: '987.654.321-00',
    cnpj: '98.765.432/0001-00'
  }
]

export {
  taxesMock
}
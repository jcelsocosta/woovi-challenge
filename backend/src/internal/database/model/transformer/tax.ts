import { TaxModel } from "../tax";

function toTaxModel(tax: TaxModel): TaxModel {
  return new TaxModel (
    tax.taxID,
    tax.createdAt,
    tax.updatedAt,
    tax.createdDate,
    tax.cpf,
    tax.cnpj
  )
}

export { toTaxModel }
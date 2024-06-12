import { Entity, ObjectIdColumn, PrimaryColumn, ObjectId, Column } from "typeorm"

@Entity({ name: 'taxes' })
class TaxModel {
  @ObjectIdColumn()
  readonly id?: ObjectId
  @Column({ name: 'taxID', type: 'uuid' })
  readonly taxID: string
  @Column({ name: 'createdAt', type: 'timestamp', nullable: false })
  readonly createdAt: Date
  @Column({ name: 'updatedAt', type: 'timestamp', nullable: false })
  readonly updatedAt: Date
  @Column({ name: 'createdDate', type: 'timestamp', nullable: false })
  readonly createdDate: Date
  @Column({ name: 'cpf', type: 'varchar', length: 20, nullable: true})
  readonly cpf: string | null
  @Column({ name: 'cnpj', type: 'varchar', length: 20, nullable: true})
  readonly cnpj

  constructor(taxID: string, createdAt: Date, updatedAt: Date, createdDate: Date,
    cpf: string | null, cnpj: string | null) {
    this.taxID = taxID
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.createdDate = createdDate
    this.cpf = cpf
    this.cnpj = cnpj
  }
}

export {
  TaxModel
}
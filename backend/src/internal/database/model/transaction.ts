import { Entity, ObjectIdColumn, PrimaryColumn, ObjectId, Column } from "typeorm"

@Entity({ name: 'transactions' })
class TransactionModel {
  @ObjectIdColumn()
  readonly id?: ObjectId
  @Column({ name: 'transactionID', type: 'uuid' })
  readonly transactionID: string
  @Column({ name: 'createdAt', type: 'timestamp', nullable: false })
  readonly createdAt: Date
  @Column({ name: 'updatedAt', type: 'timestamp', nullable: false })
  readonly updatedAt: Date
  @Column({ name: 'createdDate', type: 'timestamp', nullable: false })
  readonly createdDate: Date

  constructor(transactionID: string, createdAt: Date, updatedAt: Date, createdDate: Date) {
    this.transactionID = transactionID
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.createdDate = createdDate
  }
}

export {
  TransactionModel
}
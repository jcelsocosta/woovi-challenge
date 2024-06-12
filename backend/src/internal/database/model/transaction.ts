import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"

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
  @Column({ name: 'accountID', type: 'uuid' })
  readonly accountID: string
  @Column({ name: 'userID', type: 'uuid' })
  readonly userID: string
  @Column({name: 'value', type: 'bigint', nullable: false})
  readonly value: number
  @Column({ name: 'status', type: 'varchar', nullable: false})
  readonly status: string // processing | done | error

  constructor(transactionID: string, createdAt: Date, updatedAt: Date, createdDate: Date,
    accountID: string, userID: string, value: number, status: string) {
    this.transactionID = transactionID
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.createdDate = createdDate
    this.status = status
    this.accountID = accountID
    this.value = value
    this.userID = userID
  }
}

export {
  TransactionModel
}
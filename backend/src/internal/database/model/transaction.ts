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
  @Column({ name: 'senderAccountID', type: 'uuid' })
  readonly senderAccountID: string
  @Column({ name: 'receivedAccountID', type: 'uuid' })
  readonly receivedAccountID: string
  @Column({name: 'value', type: 'bigint', nullable: false})
  readonly value: number
  @Column({ name: 'status', type: 'varchar', nullable: false})
  readonly status: string // processing | done | error
  @Column({name: 'idempotencyKey', type: 'varchar', unique: true, nullable: false})
  readonly idempotencyKey: string

  constructor(transactionID: string, createdAt: Date, updatedAt: Date, createdDate: Date,
    senderAccountID: string, receivedAccountID: string, value: number, status: string, idempotencyKey: string) {
    this.transactionID = transactionID
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.createdDate = createdDate
    this.senderAccountID = senderAccountID
    this.receivedAccountID = receivedAccountID
    this.value = value
    this.status = status
    this.idempotencyKey = idempotencyKey
  }
}

export {
  TransactionModel
}
import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"

@Entity({ name: 'account_balances' })
class AccountBalanceModel {
  @ObjectIdColumn()
  readonly id?: ObjectId
  @Column({ name: 'accountBalanceID', type: 'uuid' })
  readonly accountBalanceID: string
  @Column({ name: 'createdAt', type: 'timestamp', nullable: false })
  readonly createdAt: Date
  @Column({ name: 'updatedAt', type: 'timestamp', nullable: false })
  readonly updatedAt: Date
  @Column({ name: 'createdDate', type: 'timestamp', nullable: false })
  readonly createdDate: Date
  @Column({ name: 'accountID', type: 'uuid' })
  readonly accountID: string
  @Column({ name: 'value', type: 'bigint', nullable: false})
  readonly value: number

  constructor(accountBalanceID: string, createdAt: Date, updatedAt: Date, createdDate: Date, accountID: string,
    value: number) {
    this.accountBalanceID = accountBalanceID
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.createdDate = createdDate
    this.accountID = accountID
    this.value = value
  }
}

export {
  AccountBalanceModel
}
import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"

@Entity({ name: 'accounts' })
class AccountModel {
  @ObjectIdColumn()
  readonly id?: ObjectId
  @Column({ name: 'accountID', type: 'uuid' })
  readonly accountID: string
  @Column({ name: 'createdAt', type: 'timestamp', nullable: false })
  readonly createdAt: Date
  @Column({ name: 'updatedAt', type: 'timestamp', nullable: false })
  readonly updatedAt: Date
  @Column({ name: 'createdDate', type: 'timestamp', nullable: false })
  readonly createdDate: Date
  @Column({ name: 'userID', type: 'uuid', nullable: false})
  readonly userID: string

  constructor(accountID: string, createdAt: Date, updatedAt: Date, createdDate: Date, userID: string) {
    this.accountID = accountID
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.createdDate = createdDate
    this.userID = userID
  }
}

export {
  AccountModel
}
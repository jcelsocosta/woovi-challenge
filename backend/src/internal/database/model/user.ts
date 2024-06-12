import { Entity, ObjectIdColumn, PrimaryColumn, ObjectId, Column } from "typeorm"

@Entity({ name: 'users' })
class UserModel {
  @ObjectIdColumn()
  readonly id?: ObjectId
  @Column({ name: 'userID', type: 'uuid' })
  readonly userID: string
  @Column({ name: 'createdAt', type: 'timestamp', nullable: false })
  readonly createdAt: Date
  @Column({ name: 'updatedAt', type: 'timestamp', nullable: false })
  readonly updatedAt: Date
  @Column({ name: 'createdDate', type: 'timestamp', nullable: false })
  readonly createdDate: Date
  @Column({ name: 'taxID', type: 'uuid', nullable: false})
  readonly taxID: string
  @Column({ name: 'firstName', type: 'varchar', length:150, nullable: false})
  readonly firstName: string
  @Column({ name:'lastName', type: 'varchar', length: 150, nullable:false})
  readonly lastName: string
  @Column({name: 'email', type: 'varchar', length:150, nullable: false})
  readonly email: string
  @Column({name: 'password', type: 'varchar', length: 250, nullable: false})
  readonly password

  constructor(userID: string, createdAt: Date, updatedAt: Date, createdDate: Date,
    taxID: string, firstName: string, lastName: string, email: string, password: string) {
    this.userID = userID
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.createdDate = createdDate
    this.taxID = taxID
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
  }
}

export {
  UserModel
}
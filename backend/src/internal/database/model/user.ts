import { Entity, ObjectIdColumn, PrimaryColumn, ObjectId, Column } from "typeorm"

@Entity({ name: 'users' })
class UserModel {
  @ObjectIdColumn({ name: '_id' })
  id: string | null
  @Column({ name: 'userID', type: 'uuid' })
  userID: string

  constructor(id: string | null, userID: string) {
    this.id = id
    this.userID = userID
  }
}

export {
  UserModel
}
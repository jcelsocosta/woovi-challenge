import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { UserModel } from '../../model/user'

class MongoDBConfig {
  private appDataSource: DataSource | any
  readonly models: any[]

  constructor() {
    this.appDataSource = null
    this.models = [UserModel]
  }

  public get getAppDataSource(): DataSource | any {
    return this.appDataSource
  }

  private buildConfigDev(): void {
    this.appDataSource = new DataSource({
      type: 'mongodb',
      url: 'mongodb://admin:example@127.0.0.1:27017/identity?authSource=admin',
      entities: this.models,
      useNewUrlParser: true,
      synchronize: false, // Isso sincronizará as entidades com o banco de dados (cuidado em produção)
      logging: true
    })
  }

  async init(): Promise<void> {
    this.buildConfigDev()

    if (this.appDataSource instanceof DataSource) {
      await this.appDataSource.initialize()
    }
  }
}

const mongoConfig = new MongoDBConfig()

export {
  mongoConfig
}

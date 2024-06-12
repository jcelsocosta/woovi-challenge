import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { AccountModel } from '../../model/account'
import { AccountBalanceModel } from '../../model/account_balance'
import { TaxModel } from '../../model/tax'
import { TransactionModel } from '../../model/transaction'
import { UserModel } from '../../model/user'

class MongoDBConfig {
  private appDataSource: DataSource | any
  readonly models: any[]

  constructor() {
    this.appDataSource = null
    this.models = [UserModel, TransactionModel, TaxModel, AccountModel, AccountBalanceModel]
  }

  public get getAppDataSource(): DataSource | any {
    return this.appDataSource
  }

  private buildConfigDev(): void {
    this.appDataSource = new DataSource({
      type: 'mongodb',
      url: 'mongodb://admin:example@localhost:27017/bank?authSource=admin',
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

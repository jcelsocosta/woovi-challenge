import { DataSource } from "typeorm"
import { initServerGraphql } from "./cmd/web/server"
import { mongoConfig } from "./internal/database/mongodb/config"

mongoConfig.init()

const appDataSource = mongoConfig.getAppDataSource as DataSource

function run(): void {
  initServerGraphql()
}

run()

export { appDataSource }

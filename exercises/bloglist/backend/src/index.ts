import startServer from './http/server'
import { startDb } from './data/db'
import * as config from './common/config'

const main = async () => {
  startServer(config.PORT)
  await startDb(config.getMongoUri()!)
}

main().catch(e => {
  console.log(e)
})
import startServer from './http/server'
import { startDb } from './data/db'
import * as config from './common/config'

const main = async () => {
  startServer(config.PORT, config.CLIENT_PORT)
  await startDb(config.MONGO_URI!)
}

main().catch(e => {
  console.log(e)
})
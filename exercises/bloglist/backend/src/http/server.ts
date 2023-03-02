import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { httpLogger, errorHandler, unknownEndpoint } from './middleware'
import router from './router'

const startServer = (port: string, client_port: string) => {
  const app = express()

  app.use(cors({ origin: `http://localhost:${client_port}` }))
  app.use(express.json())
  app.use(express.static('dist_client'))
  app.use(httpLogger())
  app.use(router)
  app.use(errorHandler)
  app.use(unknownEndpoint)

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
}

export default startServer;
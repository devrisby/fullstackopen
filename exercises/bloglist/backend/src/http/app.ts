import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import { httpLogger, errorHandler, unknownEndpoint } from './middleware'
import router from './router'
import * as config from '../common/config'

const app = express()

app.use(cors({ origin: `http://localhost:${config.CLIENT_PORT}` }))
app.use(express.json())
app.use(express.static('dist_client'))
app.use(httpLogger())
app.use(router)
app.use(errorHandler)
app.use(unknownEndpoint)

export default app
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT ?? '5000'
const CLIENT_PORT = process.env.CLIENT_PORT ?? '3000'

const MONGO_URI =
  process.env.NODE_ENV === 'dev'
    ? process.env.LOCAL_MONGO_URI
    : process.env.MONGO_URI

export { PORT, CLIENT_PORT, MONGO_URI }
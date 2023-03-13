import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT ?? '5000'
const CLIENT_PORT = process.env.CLIENT_PORT ?? '3000'
const JWT_SECRET = process.env.JWT_SECRET ?? 'secret'

const getMongoUri = () => {
  switch(process.env.NODE_ENV) {
    case 'dev':
      return process.env.LOCAL_MONGO_URI
    case 'test':
      return process.env.TEST_MONGO_URI
    default:
      return process.env.MONGO_URI
  }
}

export { PORT, CLIENT_PORT, getMongoUri, JWT_SECRET }
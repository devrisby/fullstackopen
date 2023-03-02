import mongoose from 'mongoose'

const startDb = async (uri: string) => await mongoose.connect(uri)
const stopDb = async () => {
  await mongoose.connection.close()
}

const mongoHealth = async () => await mongoose.connection.db.stats()

export { startDb, stopDb, mongoHealth }
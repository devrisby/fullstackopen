import app from './app'

const startServer = (port: string) => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
}

export default startServer;
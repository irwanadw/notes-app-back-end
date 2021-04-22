const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '172.31.20.79',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })
  server.route(routes)
  await server.start()
  console.log(`Server running on ${server.info.uri}`)
}

init()

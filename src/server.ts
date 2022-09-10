import express from 'express'
import http from 'http'

import UsersRoutes from '@routes/UsersRoutes'

import cors from 'cors'
import { port } from '@utils/credentials'

const app = express()
const server = http.createServer(app)

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/login', UsersRoutes)

server.listen(port, () => {
  console.log(`App Rodando: http://localhost:${port}`)
})

export { http }

import express from "express"
import { createServer } from  'node:http'
import { Server } from 'socket.io'
import { config } from 'dotenv'

config()

const app = express()
const server = createServer()
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('<h1>Websocket Sievert</h1>')
})

io.on("connection", (socket) => {

  console.log("usuario conectado")

  socket.on('sysmedi10_workflow_ondrop', (data) => {
    io.emit('sysmedi10_workflow_ondrop', data)
    console.log(data)
  })

  socket.on("disconnect", ()=>{
    console.log("usuario desconectado")
  })

})

server.listen(port, ()=> {
  console.log(`Servidor corriendo en el puerto ${port}`)
})
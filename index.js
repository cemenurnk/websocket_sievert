import { createServer } from  'node:http'
import { Server } from 'socket.io'
import { config } from 'dotenv'

config()

const server = createServer()
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const port = process.env.PORT || 3000

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
import express from "express"
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { config } from 'dotenv'

config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('<h1>Websocket Sievert</h1>')
})

app.post('/sys_medi_10', (req, res) => {
  
  console.log(req.body)
  io.emit("create_sysmedi10_workflow", req.body)

  res.status(200).json({resultid: "success"})
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
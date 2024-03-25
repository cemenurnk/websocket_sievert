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

app.post('/sys_medi_10/hide', (req, res) => {

  console.log(req.body)
  io.emit("hide_sysmedi10_workflow", req.body)

  res.status(200).json({resultid: "success"})
})

io.on("connection", (socket) => {

  console.log("usuario conectado")

  const events = [
    //Trajetas del workflow
    {name: "ondrop_sysmedi10_workflow"},
    {name: "hide_sysmedi10_workflow"},
    {name: "update_sysmedi10_workflow"},
    //Etiquetas del workflow
    {name: "insert_sysmedi28_workflow"},
    {name: "delete_sysmedi28_workflow"},
    {name: "insert_sysmedi27_workflow"},
    {name: "update_sysmedi27_workflow"},
    //Miembros del workflow
    {name: "insert_sysmedi25_workflow"},
    {name: "delete_sysmedi25_workflow"},
  ]

  //Renderizado dinámico de event listeners
  events.forEach(event => {
    socket.on(event.name, (data) =>{
      io.emit(event.name, data)
      console.log(event.name, " => ", data)
    })
  })

  //tarjetas del workflow

  // socket.on('ondrop_sysmedi10_workflow', (data) => {
  //   io.emit('ondrop_sysmedi10_workflow', data)
  //   console.log(data)
  // })

  // socket.on('hide_sysmedi10_workflow', (data) => {
  //   io.emit('hide_sysmedi10_workflow', data)
  //   console.log(data)
  // })

  socket.on("disconnect", ()=>{
    console.log("usuario desconectado")
  })

})

server.listen(port, ()=> {
  console.log(`Servidor corriendo en el puerto ${port}`)
})
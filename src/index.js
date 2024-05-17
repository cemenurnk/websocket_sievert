import express from "express"
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { config } from 'dotenv'
import sysMedi10Router from "./routes/sysmedi10.routes.js"
import sysAgen02Router from "./routes/sysagen02.routes.js"
import sysMedi07Router from "./routes/sysmedi07.routes.js"
import sysMedi10Events from "./events/sysmedi10.events.js"

config()

const app = express()
const server = createServer(app)
export const io = new Server(server, {
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

app.use("/sys_medi_07", sysMedi07Router)
app.use("/sys_medi_10", sysMedi10Router)
app.use("/sys_agen_02", sysAgen02Router)

io.on("connection", (socket) => {

  console.log("usuario conectado")

  const events = [
    ...sysMedi10Events
  ]

  //Renderizado dinámico de event listeners
  events.forEach(event => {
    socket.on(event.name, (data) =>{
      io.emit(event.name, data)
      console.log(event.name, " => ", data)
    })
  })

  socket.on("disconnect", ()=>{
    console.log("usuario desconectado")
  })

})

server.listen(port, ()=> {
  console.log(`Servidor corriendo en el puerto ${port}`)
})
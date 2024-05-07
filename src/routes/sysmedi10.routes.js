import { Router } from "express"
import { io } from "../index.js"

const sysMedi10Router = Router()

sysMedi10Router.post('/', (req, res) => {
  
  console.log(req.body)
  io.emit("create_sysmedi10_workflow", req.body)

  res.status(200).json({resultid: "success"})
})

sysMedi10Router.post('/hide', (req, res) => {

  console.log(req.body)
  io.emit("hide_sysmedi10_workflow", req.body)

  res.status(200).json({resultid: "success"})
})

export default sysMedi10Router
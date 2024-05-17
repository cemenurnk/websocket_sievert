import { Router } from "express"
import { io } from "../index.js"

const sysMedi07Router = Router()

sysMedi07Router.post("/sysmedi07_activo", (req, res) => {
  console.log(`sysmedi07_activo => `, req.body)
  io.emit("sysmedi07_activo", req.body)

  res.status(200).json({resultid: "success"})
})

export default sysMedi07Router
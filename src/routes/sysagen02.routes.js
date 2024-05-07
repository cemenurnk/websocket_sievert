import { Router } from "express"
import { io } from "../index.js"

const sysAgen02Router = Router()

sysAgen02Router.post("/sysagen02_llamado", (req, res) => {
  console.log("sysagen02_llamado => ", req.body)
  io.emit("sysagen02_llamado", req.body)

  res.status(200).json({resultid: "success"})
})

export default sysAgen02Router
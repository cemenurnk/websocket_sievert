import { Router } from "express"
import { io } from "../index.js"

const sysAgen02Router = Router()

const sysAgen02Fields = [
  "sysagen02_llamado",
  "sysagen02_inicio",
  "sysagen02_finalizo"
]

sysAgen02Fields.forEach(field => {
  sysAgen02Router.post(`/${field}`, (req, res) => {
    console.log(`${field} => `, req.body)
    io.emit(field, req.body)
  
    res.status(200).json({resultid: "success"})
  })  
})

export default sysAgen02Router
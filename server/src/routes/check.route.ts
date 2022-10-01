import { Router } from "express";

const check = Router()

check.get("/",(req,res)=>{
   res.send("Healthcheck")
})

export default check

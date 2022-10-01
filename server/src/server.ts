import express from "express"
import routes from "./routes"

const server = express()

// Middlewares

// Route
server.use("/",routes)

export default server

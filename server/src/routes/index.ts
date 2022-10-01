import { Router } from "express";
import check from "./check.route";

const routes = Router()

routes.use("/check",check)

export default routes

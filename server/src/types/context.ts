import { EntityManager } from "@mikro-orm/postgresql";
import { Request, Response } from "express";

export interface Context {
   req: Request,
   res: Response,
   em: EntityManager
}

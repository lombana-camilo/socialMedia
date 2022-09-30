import { MikroORM } from "@mikro-orm/core";
import config from "config";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}", // how to match migration files
  },
  dbName: config.get<string>("dbName"),
  user: config.get<string>("dbUser"),
  password: config.get<string>("dbPassword"),
  type: "postgresql",
  debug: process.env.NODE_ENV !== "production",

  //database tables
  entities: ["./src/entities/**/*.ts"],
} as Parameters<typeof MikroORM.init>[0];

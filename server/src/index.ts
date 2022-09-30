import server from "./server";
import config from "config";
import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const port = config.get<string>("port");

async function main() {
  try {
    // Mikroorm
    const orm = await MikroORM.init(mikroConfig);
    const em = orm.em as EntityManager;
    // Run Migrations
    await orm.getMigrator().up();

    const firstPost = em.create(Post, { title: "My first post" });
    await em.persistAndFlush(firstPost);

    server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
}

main();

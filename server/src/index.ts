import "reflect-metadata"
import server from "./server";
import config from "config";
import { MikroORM } from "@mikro-orm/core";
import { EntityManager } from "@mikro-orm/postgresql";
import mikroConfig from "./mikro-orm.config";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import { PostResolver } from "./resolvers/post.resolver";
import { Context } from "./types/context";
import { UserResolver } from "./resolvers/user.resolver";

const port = config.get<string>("port");

async function main() {
  try {
    // Mikroorm
    const orm = await MikroORM.init(mikroConfig);
    const em = orm.em as EntityManager;
    // Run Migrations
    await orm.getMigrator().up();

    // Seed
    /* const firstPost = em.create(Post, { title: "My first post" }); */
    /* await em.persistAndFlush(firstPost); */

    // Schema
    const schema = await buildSchema({
      resolvers: [PostResolver, UserResolver],
      /* authChecker */
    });

    // Apollo Server
    const apolloServer = new ApolloServer({
      schema,
      context: (ctx: Context) => {
        ctx.em = em;
        return ctx;
      },
      plugins: [
        process.env.NODE_ENV === "production"
          ? ApolloServerPluginLandingPageProductionDefault()
          : ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: server });

    server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
}

main();

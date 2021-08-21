import "./config.js";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import typeDefs from "./Schema/TypeDefs.js";
import resolvers from "./Schema/Resolver.js";
import connect from "./Models/index.js";

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  connect();

  app.set("port", process.env.PORT || 3000);

  app.use(morgan("dev"));
  app.use(cors());
  app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기중");
  });
}
startServer();

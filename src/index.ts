import compress from "@fastify/compress";
import cors from "@fastify/cors";
import env from "@fastify/env";
import helmet from "@fastify/helmet";
import app from "./app";
import { compressOptions } from "./config/compress";
import { corsOptions } from "./config/cors";
import { envOptions, Envs } from "./config/env";
import { helmetOptions } from "./config/helmet";

const onError = (err: Error | null): void => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
};

const onReady = (err: Error | null): void => {
  onError(err);

  const port = app.getEnvs<Envs>().PORT;

  app.listen({ port }, onError);
};

(async () => {
  await app.register(env, envOptions);
  await app.register(cors, corsOptions);
  await app.register(helmet, helmetOptions);
  await app.register(compress, compressOptions);

  app.get("/", async (_, res) => {
    res.send({ hello: "world" });
  });

  app.ready(onReady);
})();

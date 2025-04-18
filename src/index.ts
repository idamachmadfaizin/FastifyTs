import cors from "@fastify/cors";
import fastifyEnv from "@fastify/env";
import app from "./app";
import { corsOptions } from "./config/cors";
import { envOptions, Envs } from "./config/env";

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
  await app.register(fastifyEnv, envOptions);
  await app.register(cors, corsOptions);

  app.get("/", async (_, res) => {
    res.send({ hello: "world" });
  });

  app.ready(onReady);
})();

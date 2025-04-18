import autoload from "@fastify/autoload";
import path from "node:path";
import app from "./app";
import { Envs } from "./plugins/env";

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
  app.register(autoload, {
    dir: path.join(__dirname, "plugins"),
  });

  app.register(autoload, {
    dir: path.join(__dirname, "routes"),
    // options: { prefix: "/api" },
  });

  app.ready(onReady);
})();

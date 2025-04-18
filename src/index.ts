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

  const env = app.getEnvs<Envs>();

  if (env.NODE_ENV === "development") {
    console.info(app.printRoutes());
  }

  app.listen({ port: env.PORT }, onError);
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

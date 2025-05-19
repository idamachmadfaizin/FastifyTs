import autoload from "@fastify/autoload";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import path from "node:path";
import app from "./app";
import { Envs } from "./plugins/env";

const globalErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): void => {
  request.log.error(error);
  reply.status(500).send({ error: "Internal Server Error" });
};

const onReadyError = (err: Error | null): void => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
};

const onReady = (err: Error | null): void => {
  onReadyError(err);

  const env = app.getEnvs<Envs>();

  // if (env.NODE_ENV === "development") {
  //   console.info(app.printRoutes());
  // }

  app.listen({ port: env.PORT }, onReadyError);
};

(async () => {
  app.register(autoload, {
    dir: path.join(__dirname, "plugins"),
  });

  app.register(autoload, {
    dir: path.join(__dirname, "routes"),
    // options: { prefix: "/api" },
  });

  app.setErrorHandler(globalErrorHandler);
  app.ready(onReady);
})();

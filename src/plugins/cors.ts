import { FastifyCorsOptions } from "@fastify/cors";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const corsOptions: FastifyCorsOptions = {
  origin: "*",
};

export default fp(async (app: FastifyInstance) => {
  await app.register(import("@fastify/cors"), corsOptions);
});

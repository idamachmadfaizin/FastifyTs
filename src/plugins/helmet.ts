import { FastifyHelmetOptions } from "@fastify/helmet";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const options: FastifyHelmetOptions = {};

export default fp(async (app: FastifyInstance) => {
  await app.register(import("@fastify/helmet"), options);
});

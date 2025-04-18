import { FastifyHelmetOptions } from "@fastify/helmet";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export const helmetOptions: FastifyHelmetOptions = {};

export default fp(async (app: FastifyInstance) => {
  await app.register(import("@fastify/helmet"), helmetOptions);
});

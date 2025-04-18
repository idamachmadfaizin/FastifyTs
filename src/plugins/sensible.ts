import { FastifySensibleOptions } from "@fastify/sensible";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const options: FastifySensibleOptions = {};

export default fp(async (app: FastifyInstance) => {
  await app.register(import("@fastify/sensible"), options);
});

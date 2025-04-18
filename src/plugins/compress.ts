import { FastifyCompressOptions } from "@fastify/compress";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const options: FastifyCompressOptions = {};

export default fp(async (app: FastifyInstance) => {
  await app.register(import("@fastify/compress"), options);
});

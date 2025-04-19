import { FastifyCompressOptions } from "@fastify/compress";
import fp from "fastify-plugin";
import { App } from "../app";

const options: FastifyCompressOptions = {};

export default fp(async (app: App) => {
  await app.register(import("@fastify/compress"), options);
});

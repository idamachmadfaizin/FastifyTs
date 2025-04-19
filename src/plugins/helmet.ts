import { FastifyHelmetOptions } from "@fastify/helmet";
import fp from "fastify-plugin";
import { App } from "../app";

const options: FastifyHelmetOptions = {};

export default fp(async (app: App) => {
  await app.register(import("@fastify/helmet"), options);
});

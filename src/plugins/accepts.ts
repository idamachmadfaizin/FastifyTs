import { FastifyAcceptsOptions } from "@fastify/accepts";
import fp from "fastify-plugin";
import { App } from "../app";

const options: FastifyAcceptsOptions = {};

export default fp(async (app: App) => {
  await app.register(import("@fastify/accepts"), options);
});

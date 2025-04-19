import { FastifySensibleOptions } from "@fastify/sensible";
import fp from "fastify-plugin";
import { App } from "../app";

const options: FastifySensibleOptions = {};

export default fp(async (app: App) => {
  await app.register(import("@fastify/sensible"), options);
});

import { FastifyCorsOptions } from "@fastify/cors";
import fp from "fastify-plugin";
import { App } from "../app";

const options: FastifyCorsOptions = {
  origin: "*",
};

export default fp(async (app: App) => {
  await app.register(import("@fastify/cors"), options);
});

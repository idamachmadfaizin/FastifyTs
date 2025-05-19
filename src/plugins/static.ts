import { FastifyStaticOptions } from "@fastify/static";
import fp from "fastify-plugin";
import path from "path";
import { App } from "../app";

const options: FastifyStaticOptions = {
  root: path.join(__dirname, "..", "storage", "public"),
  prefix: "/public/", // optional: default '/'
};

export default fp(async (app: App) => {
  await app.register(import("@fastify/static"), options);
});

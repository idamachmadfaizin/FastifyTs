import { FastifyViewOptions } from "@fastify/view";
import fp from "fastify-plugin";
import { App } from "../app";
import path from "node:path";
import { ensureDirExistsAsync } from "../utils/directory";

const root = path.join(__dirname, "..", "views");

const options: FastifyViewOptions = {
  engine: {
    pug: import("pug"),
  },
  root: root,
  viewExt: "pug",
  defaultContext: {
    dev: process.env.NODE_ENV === "development",
  },
};

export default fp(async (app: App) => {
  await ensureDirExistsAsync(root);
  await app.register(import("@fastify/view"), options);
});

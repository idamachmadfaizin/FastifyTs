import { FastifyStaticOptions } from "@fastify/static";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const options: FastifyStaticOptions = {
  root: `${__dirname}/../public`,
  prefix: "/public/", // optional: default '/'
};

export default fp(async (app: FastifyInstance) => {
  await app.register(import("@fastify/static"), options);
});

import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";
import { App } from "../app";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export default fp(async (app: App) => {
  const client = new PrismaClient();
  await client.$connect();
  app.decorate("prisma", client);
  app.addHook("onClose", async (server) => {
    await server.prisma.$disconnect();
  });
});

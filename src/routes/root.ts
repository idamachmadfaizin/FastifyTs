import { App } from "../app";
import { z } from "../plugins/zod";

export default async function (app: App) {
  app.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: z.object({
          hello: z.string(),
        }),
      },
    },
    handler: async function (_, reply) {
      reply.send({ hello: "world" });
    },
  });
}

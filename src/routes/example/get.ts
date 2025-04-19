import { z } from "zod";
import { App } from "../../app";

export default async function (app: App) {
  app.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["example"],
      response: {
        200: z.object({
          hello: z.string(),
        }),
      },
    },
    handler: async function (_, reply) {
      reply.send({ hello: "example" });
    },
  });
}

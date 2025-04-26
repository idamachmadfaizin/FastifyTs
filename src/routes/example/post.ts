import { App } from "../../app";
import { z } from "../../plugins/zod";

export default async function (app: App) {
  app.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["example"],
      body: z.object({
        name: z.string().trim().min(1),
        age: z.number().optional(),
      }),
      response: {
        200: z.object({
          name: z.string(),
          age: z.number().optional(),
        }),
      },
    },
    handler: async function (request, reply) {
      const { name, age } = request.body;
      reply.send({ name, age });
    },
  });
}

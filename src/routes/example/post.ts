import { z } from "zod";
import { App } from "../../app";

export default async function (app: App) {
  app.route({
    method: "POST",
    url: "/",
    schema: {
      body: z.object({
        name: z.string().trim().min(1),
        age: z.number().optional(),
      }),
    },
    handler: async function (request, reply) {
      const { name, age } = request.body;
      reply.send({ name, age });
    },
  });
}

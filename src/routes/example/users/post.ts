import { App } from "../../../app";
import { z } from "../../../constants/zod";

export default async function (app: App) {
  app.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["example"],
      body: z.object({
        name: z.string().trim().optional(),
        email: z.string().email(),
      }),
      response: {
        200: z.object({
          id: z.number(),
          name: z.string().nullable(),
          email: z.string().email(),
        }),
      },
    },
    handler: async function (request, reply) {
      const { name, email } = request.body;

      const user = await app.prisma.user.create({
        data: {
          name,
          email,
        },
      });

      app.log.info(user);

      reply.send(user);
    },
  });
}

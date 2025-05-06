import { App } from "../../../app";
import { z } from "../../../constants/zod";

export default async function (app: App) {
  app.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["example"],
      response: {
        200: z.array(
          z.object({
            id: z.number(),
            name: z.string().nullable(),
            email: z.string().email(),
          }),
        ),
      },
    },
    handler: async function (request, reply) {
      const users = await app.prisma.user.findMany();

      reply.send(users);
    },
  });
}

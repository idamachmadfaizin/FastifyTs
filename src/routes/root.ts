import { App } from "../app";
import { z } from "../constants/zod";

export default async function (app: App) {
  app.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async function (request, reply) {
      const result = {
        message: "Hello world",
      };

      if (request.type("text/html")) {
        return reply.view("index", result);
      }

      reply.send(result);
    },
  });
}

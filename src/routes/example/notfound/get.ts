import { z } from "zod";
import { App } from "../../../app";

export default async function (app: App) {
  app.route({
    method: "GET",
    url: "/",
    schema: {
      tags: ["example"],
      response: {
        404: z.object({
          statusCode: z.literal(404),
          error: z.string(),
          message: z.string(),
        }),
      },
    },
    handler: (_, reply) => {
      reply.notFound("Example Not Found message");
    },
  });
}

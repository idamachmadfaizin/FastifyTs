import { RequestValidationError } from "fastify-zod-openapi";
import fs from "fs";
import { pipeline } from "stream";
import util from "util";
import { z } from "zod";
import "zod-openapi/extend";
import { App } from "../../../app";

export default async function (app: App) {
  app.route({
    method: "POST",
    url: "/",
    schema: {
      tags: ["example"],
      consumes: ["multipart/form-data"],
      body: z.object({
        name: z.string().trim().min(1),
        age: z.preprocess((val) => Number(val), z.number()).optional(), //When using Fastify's multipart form handling, all form fields (including numbers) are received as strings by default
        picture: z.any().openapi({
          format: "binary",
        }),
      }),
      response: {
        200: z.object({
          name: z.string(),
          age: z.number().optional(),
          message: z.string(),
        }),
      },
    },
    handler: async function (request, reply) {
      console.log("request.body:", request.body);

      reply.send({
        ...request.body,
        message: request.body.picture.filename,
      });
    },
  });
}

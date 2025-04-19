import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import fp from "fastify-plugin";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { App } from "../app";

const options: SwaggerOptions = {
  openapi: {
    info: {
      title: "My API",
      description: "API documentation",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
};

const optionsUi: FastifySwaggerUiOptions = {
  routePrefix: "/swagger",
  logLevel: "silent",
};

export default fp(async (app: App) => {
  await app.register(import("@fastify/swagger"), options);
  await app.register(import("@fastify/swagger-ui"), optionsUi);
});

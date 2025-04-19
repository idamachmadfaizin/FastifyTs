import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import fp from "fastify-plugin";
import {
  fastifyZodOpenApiPlugin,
  fastifyZodOpenApiTransform,
  fastifyZodOpenApiTransformObject,
} from "fastify-zod-openapi";
import { App } from "../app";

const options: SwaggerOptions = {
  openapi: {
    info: {
      title: "My API",
      description: "API documentation",
      version: "1.0.0",
    },
  },
  transform: fastifyZodOpenApiTransform,
  transformObject: fastifyZodOpenApiTransformObject,
};

const optionsUi: FastifySwaggerUiOptions = {
  routePrefix: "/swagger",
  logLevel: "silent",
};

export default fp(async (app: App) => {
  await app.register(fastifyZodOpenApiPlugin);
  await app.register(import("@fastify/swagger"), options);
  await app.register(import("@fastify/swagger-ui"), optionsUi);
});

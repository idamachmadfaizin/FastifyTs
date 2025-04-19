import fastify from "fastify";
import {
  type FastifyZodOpenApiTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-zod-openapi";

const app = fastify({
  logger: {
    transport: {
      target: "@fastify/one-line-logger",
    },
  },
})
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .withTypeProvider<FastifyZodOpenApiTypeProvider>();

export type App = typeof app;

export default app;

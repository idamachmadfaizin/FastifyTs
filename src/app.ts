import fastify from "fastify";
import {
  type FastifyZodOpenApiTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-zod-openapi";
import envLogger from "./constants/envLogger";

const app = fastify({
  logger: envLogger[process.env.NODE_ENV || "development"],
})
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .withTypeProvider<FastifyZodOpenApiTypeProvider>();

export type App = typeof app;

export default app;

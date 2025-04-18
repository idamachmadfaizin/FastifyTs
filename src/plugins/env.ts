import { FastifyEnvOptions } from "@fastify/env";
import { FastifyInstance } from "fastify";
import type { FromSchema, JSONSchema } from "json-schema-to-ts";
import fp from "fastify-plugin";

const schema = {
  type: "object",
  required: [],
  properties: {
    PORT: {
      type: "number",
      default: 3000,
      description: "The port to run the server on",
    },
  },
} as const satisfies JSONSchema;

const options: FastifyEnvOptions = {
  schema: schema,
  dotenv: {
    path: `${__dirname}/../../.env`,
  },
};

export type Envs = FromSchema<typeof schema>;

export default fp(async (app: FastifyInstance) => {
  await app.register(import("@fastify/env"), options);
});

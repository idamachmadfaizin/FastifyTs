import { FastifyEnvOptions } from "@fastify/env";
import type { FromSchema, JSONSchema } from "json-schema-to-ts";

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

export type Envs = FromSchema<typeof schema>;

declare module "fastify" {
  interface FastifyInstance {
    config: Envs;
  }
}

export const envOptions: FastifyEnvOptions = {
  schema: schema,
  dotenv: {
    path: `${__dirname}/../../.env`,
  },
};

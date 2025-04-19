import { FastifyEnvOptions } from "@fastify/env";
import fp from "fastify-plugin";
import type { FromSchema, JSONSchema } from "json-schema-to-ts";
import { App } from "../app";

const schema = {
  type: "object",
  required: [],
  properties: {
    PORT: {
      type: "number",
      default: 3000,
      description: "The port to run the server on",
    },
    NODE_ENV: {
      type: "string",
      enum: ["development", "production"],
      default: "development",
      description: "The environment the server is running in",
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

export default fp(async (app: App) => {
  await app.register(import("@fastify/env"), options);
});

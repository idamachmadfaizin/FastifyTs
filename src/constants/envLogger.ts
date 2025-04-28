import { FastifyServerOptions } from "fastify";
import path from "node:path";
import { logDir } from "../utils/directory";

const envLogger: Record<string, FastifyServerOptions["logger"]> = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  },
  production: {
    transport: {
      targets: [
        {
          level: "info",
          target: "pino/file",
          options: {
            destination: path.resolve(
              logDir(),
              process.env.APP_NAME || "logs",
              `log${new Date().toISOString().split("T")[0]}.log`,
            ),
          },
        },
        {
          level: "error",
          target: "pino/file",
          options: {
            destination: path.resolve(
              logDir(),
              process.env.APP_NAME || "logs",
              `err${new Date().toISOString().split("T")[0]}.log`,
            ),
          },
        },
      ],
    },
  },
};

export default envLogger;

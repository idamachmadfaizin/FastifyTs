import { FastifyServerOptions } from "fastify";
import path from "node:path";
import { ensureDirExists } from "../utils/directory";

const basePath = path.resolve(`${__dirname}/../../`, "logs");
ensureDirExists(basePath);

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
              basePath,
              `log${new Date().toISOString().split("T")[0]}.log`,
            ),
          },
        },
        {
          level: "error",
          target: "pino/file",
          options: {
            destination: path.resolve(
              basePath,
              `err${new Date().toISOString().split("T")[0]}.log`,
            ),
          },
        },
      ],
    },
  },
};

export default envLogger;

import { FastifyServerOptions } from "fastify";
import path from "node:path";
import { ensureDirExists } from "../utils/directory";

const basePath = path.join(__dirname, "..", "..", "logs");
if (process.env.NODE_ENV === "production") {
  ensureDirExists(basePath);
}

const envLogger: Record<string, FastifyServerOptions["logger"]> = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        ignore: "hostname",
        hideObject: true,
        messageFormat:
          "{if req}{req.method} {req.url} - {end}{if res}{res.statusCode} {responseTime} ms - {end}{msg}",
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
            destination: path.join(
              basePath,
              `log${new Date().toISOString().split("T")[0]}.log`,
            ),
          },
        },
        {
          level: "error",
          target: "pino/file",
          options: {
            destination: path.join(
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

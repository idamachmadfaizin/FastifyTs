import os from "os";
import fp from "fastify-plugin";
import fs from "fs";
import { pipeline } from "node:stream/promises";
import { App } from "../app";
import { MultipartFile } from "@fastify/multipart";
import path from "node:path";
import { Envs } from "./env";
export type MultipartFileValue = {
  directory: string;
  filename: string;
  encoding: string;
  mimetype: string;
};

export type MyMultiPartFile = MultipartFile & { value: MultipartFileValue };

const generateRandomCode = () => Math.random().toString(36).substring(2, 15);
const createFileName = (filename: string) =>
  `${Date.now()}-${generateRandomCode()}-${filename}`;

const isFsError = (error: unknown): error is NodeJS.ErrnoException => {
  return (error as NodeJS.ErrnoException).code !== undefined;
};

const ensureDirectoryExists = async (dirPath: string, app: App) => {
  try {
    await fs.promises.access(dirPath);
  } catch (error: unknown) {
    console.log("🚀 ~ ensureDirectoryExists ~ error:", error);
    if (isFsError(error) && error.code === "ENOENT") {
      await fs.promises.mkdir(dirPath, { recursive: true });
      app.log.info(`Directory created: ${dirPath}`);
    } else {
      throw error;
    }
  }
};

export default fp(async (app: App) => {
  await app.register(import("@fastify/multipart"), {
    attachFieldsToBody: "keyValues",
    onFile: async (part) => {
      part.filename = createFileName(part.filename);
      const tmpdir = path.resolve(os.tmpdir(), app.getEnvs<Envs>().APP_NAME);
      // await ensureDirectoryExists(tmpdir, app);
      await ensureDirectoryExists("/etc/idamasd", app);

      await pipeline(
        part.file,
        fs.createWriteStream(path.resolve(tmpdir, part.filename)),
      );

      (part as MyMultiPartFile).value = {
        directory: tmpdir,
        filename: part.filename,
        encoding: part.encoding,
        mimetype: part.mimetype,
      };
    },
  });
});

import { MultipartFile } from "@fastify/multipart";
import fp from "fastify-plugin";
import fs from "fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import os from "os";
import { App } from "../app";
import { Envs } from "./env";
import { ulid } from "ulid";

export class MultipartFileValue {
  constructor(
    public directory: string,
    public filename: string,
    public encoding: string,
    public mimetype: string,
  ) {}
}

export type MultiPartFile<T> = MultipartFile & { value: T };

const sanitizeFilename = (filename: string, maxLength = 50) => {
  return filename
    .replace(/[^a-zA-Z0-9\-._]/g, "")
    .toLowerCase()
    .substring(0, maxLength);
};

const createFileName = (filename: string) =>
  `${ulid()}-${sanitizeFilename(filename)}`;

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
    onFile: async (part: any) => {
      console.log("onFile", part.value);
      part.filename = createFileName(part.filename);
      const tmpdir = path.resolve(os.tmpdir(), app.getEnvs<Envs>().APP_NAME);
      // await ensureDirectoryExists(tmpdir, app);
      await ensureDirectoryExists("/etc/idamasd", app);

      await pipeline(
        part.file,
        fs.createWriteStream(path.resolve(tmpdir, part.filename)),
      );
      console.log("onFile", part.value);

      (part as MultiPartFile<MultipartFileValue>).value =
        new MultipartFileValue(
          tmpdir,
          part.filename,
          part.encoding,
          part.mimetype,
        );
    },
  });
});

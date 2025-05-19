import { MultipartFile } from "@fastify/multipart";
import fp from "fastify-plugin";
import fs from "fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import os from "os";
import { ulid } from "ulid";
import { App } from "../app";
import { ensureDirExistsAsync } from "../utils/directory";
import { Envs } from "./env";

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

export default fp(async (app: App) => {
  await app.register(import("@fastify/multipart"), {
    attachFieldsToBody: "keyValues",
    onFile: async (part) => {
      const tmpdir = path.join(os.tmpdir(), app.getEnvs<Envs>().APP_NAME);

      part.filename = createFileName(part.filename);
      await ensureDirExistsAsync(tmpdir);
      await pipeline(
        part.file,
        fs.createWriteStream(path.join(tmpdir, part.filename)),
      );

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

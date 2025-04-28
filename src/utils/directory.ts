import app from "../app";
import fs from "fs";
import path from "node:path";
import os from "os";
import { isNodeError } from "./error";

export const ensureDirExists = (dirPath: string) => {
  try {
    fs.accessSync(dirPath);
  } catch (error: unknown) {
    if (isNodeError(error) && error.code === "ENOENT") {
      fs.mkdirSync(dirPath, { recursive: true });

      const message = `Directory created: ${dirPath}`;
      if (app) app.log.info(message);
      else console.log(message);
    } else {
      throw error;
    }
  }
};

export const ensureDirExistsAsync = async (dirPath: string) => {
  try {
    await fs.promises.access(dirPath);
  } catch (error: unknown) {
    if (isNodeError(error) && error.code === "ENOENT") {
      await fs.promises.mkdir(dirPath, { recursive: true });
      app.log.info(`Directory created: ${dirPath}`);
    } else {
      throw error;
    }
  }
};

/**
 * Gets the operating system's default log directory
 * @returns {string} The path to the OS log directory
 */
export const logDir = (): string => {
  const platform = os.platform();

  switch (platform) {
    case "win32":
      // Windows: Usually the Event Log is in System32, but app logs often go to %ProgramData%
      return path.join(process.env.ProgramData || "C:\\ProgramData", "logs");

    case "darwin":
      // macOS: System logs are in /var/log
      return "/var/log";

    case "linux":
      // Linux: System logs are in /var/log
      return "/var/log";

    default:
      // Fallback for other platforms
      return path.join(os.homedir(), "logs");
  }
};

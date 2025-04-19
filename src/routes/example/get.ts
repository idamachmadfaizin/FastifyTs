import { App } from "../../app";

export default async function (app: App) {
  app.get("/", async function (_, reply) {
    reply.send({ hello: "example" });
  });
}

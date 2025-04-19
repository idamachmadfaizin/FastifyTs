import { App } from "../../../app";

export default async function (app: App) {
  app.get("/", function (_, reply) {
    reply.notFound("Example Not Found message");
  });
}

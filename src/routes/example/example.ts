import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", async function (_, reply) {
    reply.send({ hello: "example" });
  });

  fastify.get("/notfound", function (_, reply) {
    reply.notFound("Example Not Found message");
  });
}

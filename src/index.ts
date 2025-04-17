import fastify from 'fastify';

const server = fastify({
    logger: true,
});

server.get('/', async (request, reply) => {
    reply.send({ hello: 'world' });
});

server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    server.log.info(`Server is running at ${address}`);
});

import fastifyPlugin from 'fastify-plugin';
import fastifyMongodb from '@fastify/mongodb';

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */

async function dbConnector(fastify) {
  fastify.register(fastifyMongodb, {
    url: 'mongodb+srv://me:BQIayAvfBDmnxZ9m@cluster0.feppb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    database: 'AnimalsData',
  });
}

export default fastifyPlugin(dbConnector);

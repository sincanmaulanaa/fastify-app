/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */

const options = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          greeting: { type: 'string' },
          name: { type: 'string' },
        },
      },
    },
  },
};

async function routes(fastify) {
  const collection = fastify.mongo.db.collection('animals');

  fastify.get('/', options, async (request, reply) => {
    return { greeting: 'welcome', name: 'sincan' };
  });

  fastify.get('/animals', async (request, reply) => {
    const result = await collection.find().toArray();
    if (result.length === 0) {
      throw new Error('No document found');
    }

    return result;
  });

  fastify.get('/animals/:animal', async (request, reply) => {
    const result = await collection.findOne({ animal: request.params.animal });
    if (!result) {
      throw new Error('Invalid value');
    }

    return result;
  });

  const animalBodyJsonSchema = {
    type: 'object',
    required: ['animal'],
    properties: {
      animal: { type: 'string' },
    },
  };

  const schema = {
    body: animalBodyJsonSchema,
  };

  fastify.post('/animal', { schema }, async (request, reply) => {
    // use request.body object to get the data sent by the client
    const result = await collection.insertOne({ animal: request.body.animal });
    return result;
  });
}

export default routes;

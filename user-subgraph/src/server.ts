import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildSubgraphSchema } from '@apollo/subgraph';
import resolvers from '@user-subgraph/resolver';
import http from 'http';
import cors from 'cors';
import express from 'express';
import { expressMiddleware } from '@as-integrations/express5';

import { readFileSync } from 'fs';
import gql from 'graphql-tag';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

const typeDefs = gql(readFileSync('./user-subgraph/src/schema.graphql', { encoding: 'utf-8' }));

async function startApolloServer() {
  const port = 4001;
  const subgraphName = 'user';

  // Optional: Set up Voyager middleware for schema visualization
  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);
  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

  try {
    await server.start();

    // Set up our Express middleware to handle CORS, body parsing,
    // and our expressMiddleware function.
    app.use(
      '/graphql',
      cors(),
      // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
      express.json({ limit: '50mb' }),
      // expressMiddleware accepts the same arguments:
      // an Apollo Server instance and optional configuration options
      expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token, dataSources: {} }),
      })
    );

    // Modified server startup
    await new Promise<void>(resolve => httpServer.listen({ port }, resolve));
    console.log(`🚀 Subgraph ${subgraphName} running at ${port}`);
  } catch (err) {
    console.error(err);
  }
}

startApolloServer();

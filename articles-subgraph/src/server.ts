import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import resolvers from "./resolvers";

import { readFileSync } from "fs";
import gql from "graphql-tag";

const articlesTypeDefs = gql(readFileSync('./articles-subgraph/src/typeDefs/articles.graphql', { encoding: 'utf-8' }));
const userArticlesTypeDefs = gql(readFileSync('./articles-subgraph/src/typeDefs/user-articles.graphql', { encoding: 'utf-8' }));

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs: [articlesTypeDefs, userArticlesTypeDefs], resolvers }),
    // schema: buildSubgraphSchema([{typeDefs: articlesTypeDefs, resolvers}, {typeDefs: userArticlesTypeDefs, resolvers}]),
  });

  const port = 4002;
  const subgraphName = 'articles';

  try {
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        return {
          dataSources: {},
        };
      },
      listen: { port },
    });

    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

startApolloServer();
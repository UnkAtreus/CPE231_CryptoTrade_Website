import { GqlModuleOptions } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
const graphql_config: GqlModuleOptions = {
  installSubscriptionHandlers: true,
  autoSchemaFile: 'schema.gql',
  debug: false,
  playground: true,
  context: ({ req, connection }) =>
    connection ? { req: req } : { headers: req.headers },
  resolvers: { JSON: GraphQLJSON },
};
export default graphql_config;

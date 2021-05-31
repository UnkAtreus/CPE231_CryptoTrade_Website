import { GqlModuleOptions } from '@nestjs/graphql';
const graphql_config: GqlModuleOptions = {
  installSubscriptionHandlers: true,
  autoSchemaFile: 'schema.gql',
  debug: false,
  playground: true,
  context: ({ req }) => ({ headers: req.headers }),
};
export default graphql_config;

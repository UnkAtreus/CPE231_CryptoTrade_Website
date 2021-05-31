import { Mutation, Resolver, Subscription } from '@nestjs/graphql';

import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver()
export class OrderResolver {
  @Subscription(() => String)
  testOrder() {
    return pubSub.asyncIterator('test');
  }
  @Mutation(() => String)
  async testOrder2() {
    pubSub.publish('test', 'testMessage');
    return 'test';
  }
  // @Interval(2000)
}

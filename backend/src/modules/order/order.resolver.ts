import {
  Args,
  Context,
  ID,
  Mutation,
  Resolver,
  Subscription,
} from '@nestjs/graphql';

import { PubSub } from 'graphql-subscriptions';
import { Roles } from 'src/middleware/guard/roles.decorator';
import OrderInput from 'src/models/input/order.input';
import { Order } from 'src/models/object/order.model';
import { User } from 'src/models/object/user.model';
import { OrderService } from './order.service';

// const pubSub = new PubSub();
@Resolver()
export class OrderResolver {
  private pubSub: PubSub;
  constructor(private readonly orderService: OrderService) {
    this.pubSub = new PubSub();
  }
  @Subscription(() => Order, {
    // filter: (payload, variables) => payload.orderAdded.id === variables.id,
  })
  // @UseGuards(GraphqlJwtAuthGuard)
  orderAdded() {
    return this.pubSub.asyncIterator('orderAdded');
  }

  @Mutation(() => Order)
  @Roles(['customer'])
  async createOrder(
    @Context('user') user: User,
    @Args('input') input: OrderInput,
  ): Promise<Order> {
    console.log(user.id);

    const order: Order = await this.orderService.createOrder(user.id, input);
    this.pubSub.publish('orderAdded', { orderAdded: order });
    return order;
  }

  @Mutation(() => Order)
  @Roles(['customer'])
  async cancelOrder(
    @Context('user') user: User,
    @Args('id', { type: () => ID }) input: number,
  ): Promise<Order> {
    return await this.orderService.cancelOrder(user.id, input);
  }
}

import { Inject } from '@nestjs/common';
import {
  Args,
  Context,
  ID,
  Mutation,
  Query,
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
  // private pubSub: PubSub;
  constructor(
    private readonly orderService: OrderService,
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
  ) {
    // this.pubSub = new PubSub();
  }
  // @UseGuards(GraphqlJwtAuthGuard)
  // filter: (payload, variables) => payload.orderAdded.id === variables.id,
  @Subscription(() => Order, {})
  orderTrigger() {
    return this.pubSub.asyncIterator('orderTrigger');
  }

  @Mutation(() => Order)
  @Roles(['customer'])
  async createOrder(
    @Context('user') user: User,
    @Args('input') input: OrderInput,
  ): Promise<Order> {
    const order: Order = await this.orderService.createOrder(user.id, input);
    this.pubSub.publish('orderTrigger', { orderTrigger: order });
    return order;
  }

  @Mutation(() => Order)
  @Roles(['customer'])
  async cancelOrder(
    @Context('user') user: User,
    @Args('id', { type: () => ID }) input: number,
  ): Promise<Order> {
    const order = await this.orderService.cancelOrder(user.id, input);
    this.pubSub.publish('orderTrigger', { orderTrigger: order });
    return order;
  }
  @Mutation(() => Order)
  @Roles(['customer'])
  async fillOrder(
    @Args('id', { type: () => ID }) input: number,
  ): Promise<Order> {
    const order = await this.orderService.fillOrder(input);
    this.pubSub.publish('orderTrigger', { orderTrigger: order });
    return order;
  }
  @Query(() => [Order])
  @Roles(['customer'])
  async Orders(@Context('user') user: User): Promise<Order[]> {
    return await this.orderService.getOrderByUserId(user);
  }
  @Query(() => [Order])
  async AllOrders(): Promise<Order[]> {
    return await this.orderService.getOrderAll();
  }
}

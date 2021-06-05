import {
  forwardRef,
  Inject,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { Order } from 'src/models/object/order.model';
import * as Websocket from 'websocket';
import { WalletService } from '../wallet/wallet.service';
import { RepoService } from '../../repo/repo.service';
import OrderInput from 'src/models/input/order.input';
import { UserService } from '../user/user.service';
import { OrderMethod } from 'src/static/enum';
import {
  NotEnoughBalanceInWallet,
  Unauthorized,
} from '../../utils/error-handling';
import { throws } from 'assert';
import { User } from 'src/models/object/user.model';
import { PubSub } from 'graphql-subscriptions';
import OrderMarketInput from 'src/models/input/ordermarket.input';
import { Interval } from '@nestjs/schedule';
const webClient = Websocket.client;
@Injectable()
export class OrderService implements OnApplicationBootstrap {
  XXXUSDT: [];
  constructor(
    private readonly walletService: WalletService,
    private readonly repoService: RepoService,
    private readonly userService: UserService,
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
  ) {
    this.XXXUSDT = [];
  }
  onApplicationBootstrap() {
    this.handleInterval();
  }
  @Interval(1000)
  async fillOrderInterval() {
    const orderLists = await this.repoService.orderRepo.find({
      where: {
        filled: false,
        cancel: false,
      },
      relations: ['walletTo', 'walletFrom'],
    });

    orderLists.forEach(async (order) => {
      this.XXXUSDT.forEach(async (t) => {
        console.log(order.price, t['c']);
        if (Number(t['c']) > Number(order.price)) {
          console.log(order.id);

          await this.fillOrder(order.id);
          this.pubSub.publish('orderTrigger', { orderTrigger: order });
        }
      });
    });
  }
  async handleInterval() {
    const client = new webClient();
    client.on('connectFailed', (error) => {
      console.log('----> Connect Error: ' + error.toString());
    });
    client.on('connect', (connection) => {
      console.log('WebSocket Client Connected');
      connection.on('error', (error) => {
        console.log('----> Connection Error: ' + error.toString());
      });
      connection.on('close', () => {
        console.log('--- Connection Closed ---');
      });
      connection.on('message', (message) => {
        if (message.type === 'utf8') {
          const x = JSON.parse(message.utf8Data);
          const data = x['data'].filter(isInCoin);
          const result = data.map(({ s, c }) => ({
            s,
            c,
          }));
          this.XXXUSDT = result;
        }
      });
    });
    client.connect(
      'wss://stream.binance.com:9443/stream?streams=!ticker@arr',
      '',
    );
  }

  async createOrder(userId: number, input: OrderInput): Promise<Order> {
    const user = await this.userService.getUserById(userId);
    const walletFrom = await this.walletService.getWalletByCurrency(
      userId,
      input.currencyFrom,
    );
    if (Number(walletFrom.amount) < input.amount) {
      throw NotEnoughBalanceInWallet;
    }
    const walletTo = await this.walletService.getWalletByCurrency(
      userId,
      input.currencyTo,
    );
    const total: number = Number(input.price) * Number(input.amount);
    const order: Order = {
      user: user,
      method: input.method,
      walletFrom: walletFrom,
      walletTo: walletTo,
      price: String(input.price),
      amount: String(input.amount),
      totalBalance: String(total),
      cancel: false,
      filled: false,
      type: input.type,
    };

    await this.walletService.Sell(order.walletFrom.id, input.amount);

    return await this.repoService.orderRepo.save(order);
  }

  async getOrderById(orderId: number): Promise<Order> {
    return await this.repoService.orderRepo.findOne(orderId, {
      relations: ['user', 'walletFrom', 'walletTo'],
    });
  }

  async cancelOrder(userId: number, orderId: number): Promise<Order> {
    const order = await this.getOrderById(orderId);
    if (order.user.id == userId) {
      await this.walletService.cancelOrder(
        order.walletFrom.id,
        Number(order.amount),
      );
      order.cancel = true;

      const orderResult = await this.repoService.orderRepo.save(order);
      return await this.getOrderById(orderResult.id);
    } else {
      throw Unauthorized;
    }
  }
  async getOrderAll(): Promise<Order[]> {
    return await this.repoService.orderRepo.find({
      relations: [
        'walletFrom',
        'walletTo',
        'walletFrom.currency',
        'walletTo.currency',
        'user',
        'method',
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }
  async getOrderByUserId(user: User): Promise<Order[]> {
    return await this.repoService.orderRepo.find({
      where: {
        user: user.id,
      },
      relations: [
        'walletFrom',
        'walletTo',
        'walletFrom.currency',
        'walletTo.currency',
        'user',
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }
  async fillOrder(orderId: number): Promise<Order> {
    const order = await this.getOrderById(orderId);
    return await this.walletService
      .Buy(
        order.walletTo.id,
        order.walletFrom.id,
        Number(order.amount),
        Number(order.totalBalance),
      )
      .then(() => {
        order.filled = true;
        return this.repoService.orderRepo.save(order);
      });
  }
  async fillOrderModel(orderInput: Order): Promise<Order> {
    // const order = await this.getOrderById(orderId);
    return await this.walletService
      .Buy(
        orderInput.walletTo.id,
        orderInput.walletFrom.id,
        Number(orderInput.amount) * 0.9999,
        Number(orderInput.totalBalance),
      )
      .then(() => {
        orderInput.filled = true;
        orderInput.fee = String(Number(orderInput.amount) * 0.0001);
        return this.repoService.orderRepo.save(orderInput);
      });
  }
}

// @Interval(2000)
//   async fillOrderInterval() {
//     const orderLists = await this.repoService.orderRepo.find({
//       where: {
//         price: this.price,
//         filled: false,
//         cancel: false,
//       },
//       relations: ['walletTo', 'walletFrom'],
//     });
//     orderLists.forEach(async (order) => {
//       this.fillOrderModel(order).then(() => {
//         return this.pubSub.publish('orderTrigger', { orderTrigger: order });
//       });
//     });
//   }

export function isInCoin(element: any): boolean {
  if (
    element.s == 'BTCUSDT' ||
    element.s == 'ADAUSDT' ||
    element.s == 'ETHUSDT' ||
    element.s == 'BCHUSDT' ||
    element.s == 'DOTUSDT'
  )
    return true;
  else return false;
}

import {
  forwardRef,
  Inject,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Order } from 'src/models/object/order.model';
import * as Websocket from 'websocket';
import { WalletService } from '../wallet/wallet.service';
import { RepoService } from '../../repo/repo.service';
import OrderInput from 'src/models/input/order.input';
import { UserService } from '../user/user.service';
import { OrderMethod } from 'src/static/enum';
import { Unauthorized } from '../../utils/error-handling';
import { throws } from 'assert';
const webClient = Websocket.client;
@Injectable()
export class OrderService implements OnApplicationBootstrap {
  price: number;
  constructor(
    private readonly walletService: WalletService,
    private readonly repoService: RepoService,
    private readonly userService: UserService,
  ) {
    this.price = 0;
  }
  onApplicationBootstrap() {
    // this.handleInterval();
  }

  async handleInterval() {
    const client = new webClient();
    client.on('connectFailed', (error) => {
      console.log('----> Connect Error: ' + error.toString());
    });
    client.on('connect', (connection) => {
      console.log('WebSocket Client Connected');
      connection.on('error', function (error) {
        console.log('----> Connection Error: ' + error.toString());
      });
      connection.on('close', () => {
        console.log('--- Connection Closed ---');
      });
      connection.on('message', (message) => {
        if (message.type === 'utf8') {
          const x = JSON.parse(message.utf8Data);
          this.price = x['data']['p'];
        }
      });
    });
    client.connect(
      'wss://stream.binance.com:9443/stream?streams=btcusdt@aggTrade',
      '',
    );
  }
  async test() {
    return (this.price += 15);
  }

  async createOrder(userId: number, input: OrderInput): Promise<Order> {
    const user = await this.userService.getUserByToken(userId);
    const walletFrom = await this.walletService.getWalletByCurrency(
      userId,
      input.currencyFrom,
    );

    const walletTo = await this.walletService.getWalletByCurrency(
      userId,
      input.currencyTo,
    );
    const order: Order = {
      user: user,
      method: input.method,
      walletFrom: walletFrom,
      walletTo: walletTo,
      price: String(input.price),
      amount: String(input.amount),
      totalBalance: String(input.price * input.amount),
      cancel: false,
      filled: false,
    };

    await this.walletService.Sell(
      order.walletFrom.id,
      input.price * input.amount,
    );

    return await this.repoService.orderRepo.save(order);
    // return;
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
      return await this.repoService.orderRepo.save(order);
    } else {
      throw Unauthorized;
    }
  }

  @Interval(2000)
  async fillOrder() {
    // console.log(this.price);
    // const orderLists = await this.repoService.orderRepo.find({
    //   where: {
    //     price: this.price,
    //     filled: false,
    //     cancel: false,
    //   },
    //   relations: ['walletTo'],
    // });
    // orderLists.forEach(async (order) => {
    //   await this.walletService.Buy(
    //     order.walletTo.id,
    //     order.walletFrom.id,
    //     Number(order.amount),
    //     Number(order.totalBalance),
    //   );
    //   /// TRIGGER TO SUBSCRIPTION
    // });
  }
}

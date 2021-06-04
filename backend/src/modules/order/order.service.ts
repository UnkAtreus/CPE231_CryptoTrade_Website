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
import {
  NotEnoughBalanceInWallet,
  Unauthorized,
} from '../../utils/error-handling';
import { throws } from 'assert';
import { User } from 'src/models/object/user.model';
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
      connection.on('error', (error) => {
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

  async createOrder(userId: number, input: OrderInput): Promise<Order> {
    const user = await this.userService.getUserByToken(userId);
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
    console.log(total);
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
      return await this.repoService.orderRepo.save(order);
    } else {
      throw Unauthorized;
    }
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
      ],
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

  @Interval(2000)
  async fillOrderInterval() {
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

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
const webClient = Websocket.client;
@Injectable()
export class OrderService implements OnApplicationBootstrap {
  constructor(
    private readonly walletService: WalletService,
    private readonly repoService: RepoService,
    private readonly userService: UserService,
  ) {}
  onApplicationBootstrap() {
    // this.handleInterval();
  }
  private readonly price: number = 0;
  handleInterval() {
    const client = new webClient();
    client.on('connectFailed', function (error) {
      console.log('----> Connect Error: ' + error.toString());
    });
    client.on('connect', function (connection) {
      console.log('WebSocket Client Connected');
      connection.on('error', function (error) {
        console.log('----> Connection Error: ' + error.toString());
      });
      connection.on('close', function () {
        console.log('--- Connection Closed ---');
      });
      connection.on('message', function (message) {
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
      input.currenyIDFrom,
    );
    const walletTo = await this.walletService.getWalletByCurrency(
      userId,
      input.currenyIDTo,
    );
    const order: Order = {
      user: user,
      method: input.method,
      walletFrom: walletFrom,
      walletTo: walletTo,
      price: input.price,
      amount: input.amount,
      totalBalance: input.price * input.amount,
      cancel: false,
      filled: false,
    };
    await this.walletService.Sell(order.walletFrom.id, order.totalBalance);
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
      await this.walletService.Buy(order.walletFrom.id, order.totalBalance);
      order.cancel = true;
      return await this.repoService.orderRepo.save(order);
    } else {
      throw Unauthorized;
    }
  }

  // @Interval(2000)
  async fillOrder() {
    console.log(this.price);
    const orderLists = await this.repoService.orderRepo.find({
      where: {
        price: this.price,
        filled: false,
        cancel: false,
      },
      relations: ['walletTo'],
    });
    orderLists.forEach(async (order) => {
      await this.walletService.Buy(order.walletTo.id, order.amount);
      /// TRIGGER TO SUBSCRIPTION
    });
  }
}

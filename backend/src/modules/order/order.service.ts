import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { Order } from 'src/models/object/order.model';
import * as Websocket from 'websocket';
import { WalletService } from '../wallet/wallet.service';
import { RepoService } from '../../repo/repo.service';
import OrderInput from 'src/models/input/order.input';
import { UserService } from '../user/user.service';
const webClient = Websocket.client;
@Injectable()
export class OrderService implements OnApplicationBootstrap {
  constructor(
    private readonly walletService: WalletService,
    private readonly repoService: RepoService,
    private readonly userService: UserService,
  ) {}
  private price: number;
  onApplicationBootstrap() {
    // this.handleInterval();
  }
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
    const user = this.userService.getUserByToken(userId);
    // const walletFrom =
    return;
  }

  // @Interval(1000)
  async updateOrder() {
    console.log(this.price);
  }
}

import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import * as Websocket from 'websocket';
const webClient = Websocket.client;
@Injectable()
export class OrderService implements OnApplicationBootstrap {
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

  // @Interval(1000)
  async updateOrder() {
    console.log(this.price);
  }
}

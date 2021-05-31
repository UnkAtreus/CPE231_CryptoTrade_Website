import { Resolver } from '@nestjs/graphql';
// import WebSocket from 'ws';
import * as Websocket from 'websocket';
const webClient = Websocket.client;
@Resolver()
export class TestResolver {
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
          console.log("Received: '" + message.utf8Data + "'");
        }
      });
    });
    client.connect(
      'wss://stream.binance.com:9443/stream?streams=btcusdt@aggTrade',
      '',
    );
  }
}

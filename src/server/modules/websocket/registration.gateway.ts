import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, OnGatewayConnection, OnGatewayDisconnect  } from '@nestjs/websockets';

@WebSocketGateway(6755)
export class RegistrationGateway  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  public clients = [];

  public messages = [
  {
    id: 1,
    text: 'Hello everyone!!!'
  },
  {
    id: 2,
    text: 'I\'m here!!!'
  },
  {
    id: 3,
    text: 'Who there???'
  },
  {
    id: 4,
    text: 'Damn!'
  },
  {
    id: 5,
    text: 'I\'m off'
  }
  ];

  constructor() {

  }

  handleConnection(client: any) {
    this.clients.push(client);
    this.initConnection(this.messages);
  }

  handleDisconnect(client) {
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].id === client.id) {
        this.clients.splice(i, 1);
        break;
      }
    }
  }

  @SubscribeMessage('messages') onMessages(client, [data, cb]): any {
    cb(this.messages);
  }

  private initConnection(message: {id: number, text: string}[]): any {
    for (let c of this.clients) {
     // console.log(message);
      // c.emit('messages', {data: message});
      c.emit('messages', JSON.stringify({
        data: message
      }));
    }
  }
}
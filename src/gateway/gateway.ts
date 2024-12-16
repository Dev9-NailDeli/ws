import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { OnModuleInit } from "@nestjs/common";
import * as console from "node:console";

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("newMessage")
  onNewMessage(@MessageBody() body: any): void {
    console.log(body);
    this.server.emit("onMessage", {
      msg: "new message",
      content: body,
    });
  }

  onModuleInit(): any {
    this.server.on("connection", (socket) => {
      console.log("New client connected");
      console.log(socket.id);
    });
  }
}

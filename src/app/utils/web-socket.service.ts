import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;

  constructor() { }

  connect(): Observable<any> {
    const socket = new SockJS(environment.WEBSOCKET_PATH);

    this.stompClient = Stomp.over(socket);
    return new Observable(observer => {
      this.stompClient.connect({}, (frame: any) => {
        observer.next(frame);
      });
    });
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }

  subscribe(destination: string, callback: (message: any) => void): void {
    if (this.stompClient) {
      this.stompClient.subscribe(destination, (message: any) => {
        callback(JSON.parse(message.body));
      });
    }
  }

  sendMessage(destination: string, message: any): void {
    if (this.stompClient) {
      this.stompClient.send(destination, {}, JSON.stringify(message));
    }
  }
}

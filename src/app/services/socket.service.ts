import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { Client } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: Client;
  public receivedData = new Subject<string>(); 
  constructor() { 
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8000/ws'),
      onConnect: () => {
        this.stompClient.subscribe('/topic/prices', (message) => {
          this.receivedData.next(message.body); 
        });
      }
    });
  }

  connect() {
    this.stompClient.activate();
  }

  sendMessage(message: string) {
    this.stompClient.publish({
      destination: '/app/chat',
      body: message
    });
  }

  disconnect() {
    this.stompClient.deactivate();
  }
}
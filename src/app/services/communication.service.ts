import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private stompClient: any = null;
  private messageSubject = new Subject<string>();
  public message$ = this.messageSubject.asObservable();
  private currentChatRoomId: string | null = null;

  connect(chatRoomId: string): void {
    if (this.stompClient && this.stompClient.connected) {
      this.disconnect(); // Disconnect from the previous room
    }

    this.currentChatRoomId = chatRoomId;

    // Create a factory function for SockJS
    const sockJsFactory = () => new SockJS('http://localhost:8083/ws');
    
    this.stompClient = Stomp.over(sockJsFactory);

    const chatRoomTopic = `/topic/chat_room/${chatRoomId}`;
    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected to WebSocket:', frame);
      this.stompClient.subscribe(chatRoomTopic, (message: any) => {
        console.log("Received real-time message:", message.body);
        this.showMessage(message.body);
      });
    }, (error: any) => {
      console.error('WebSocket connection error:', error);
      this.reconnect(); // Reconnect if there's an error
    });
  }

  showMessage(message: string): void {
    this.messageSubject.next(message);
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket");
      });
    }
  }

  reconnect(): void {
    if (this.currentChatRoomId) {
      setTimeout(() => {
        this.connect(this.currentChatRoomId); // Reconnect to the current chat room
      }, 5000); // Reconnect after 5 seconds
    }
  }

  sendPrivateMessage(senderId: string, recipientId: string, chatRoomId: string, content: string): void {
    if (this.stompClient && this.stompClient.connected) {
      const message = {
        senderId,
        recipientId,
        chatRoomId,
        content,
        timestamp: new Date().toISOString(),
      };

      this.stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
    } else {
      console.error("WebSocket not connected");
    }
  }
}

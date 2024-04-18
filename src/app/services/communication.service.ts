import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Stomp } from '@stomp/stompjs';
import  SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor() { }
  disabled = true;

  private stompClient = null;

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
    }
  }
connect() {
    const socket = new SockJS('http://localhost:8083/' + 'ws');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect(
      {
        // headers: this.authService.createAuthorizationHeader()
      }
      , function (frame) {
        console.log('Connected Hi: ' + frame);
        _this.stompClient.subscribe('/topic/messages', function (hello) {
          console.log(hello.body);
          // _this.showMessage(JSON.parse(hello.body));
          _this.showChat(hello.body);
        });
      });
  }
sendPrivateMessage(newmessage) {
    this.stompClient.send(
      '/topic/sendMessage',   //doubt in topic check later
      {},
      newmessage
    );
    console.log(newmessage);
    newmessage = "";
  }

  private greetingsSubject: Subject<string> = new Subject<string>();
  greetings$ = this.greetingsSubject.asObservable();

  showChat(message: string) {
    this.greetingsSubject.next(message);
  }
}

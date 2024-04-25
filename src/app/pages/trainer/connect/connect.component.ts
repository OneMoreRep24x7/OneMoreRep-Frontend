import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunicationService } from '../../../services/communication.service';
import { TrainerService } from '../../../services/trainer.service';
import { ChatService } from '../../../services/chat.service';
import { Trainer } from '../../../model/trainer.model';



@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  trainer: Trainer;
  trainerId = '';
  chatRooms: any[] = [];
  selectedChatRoom: any = null;
  chatMessages: any[] = [];
  messageContent = '';

  constructor(
    private communicationService: CommunicationService,
    private trainerService: TrainerService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.trainer = JSON.parse(sessionStorage.getItem('user'));
    this.trainerId = this.trainer.id;

    // Fetch existing chat rooms
    this.chatService.getChatRoomsForTrainer(this.trainerId).subscribe((rooms) => {
      this.chatRooms = rooms;
    });

    // Subscribe to WebSocket messages
    this.communicationService.message$.subscribe((msg) => {
      const receivedMessage = JSON.parse(msg);
      if (this.selectedChatRoom && receivedMessage.chatRoomId === this.selectedChatRoom.id) {
        this.chatMessages.push(receivedMessage);
      }
    });
  }

  selectChatRoom(chatRoom: any): void {
    if (this.selectedChatRoom) {
      this.communicationService.disconnect();
    }

    this.selectedChatRoom = chatRoom;

    // Connect to the selected chat room
    this.communicationService.connect(`${this.trainerId}_${chatRoom.userId}`);

    // Load previous messages
    this.chatService.getMessagesBetweenUsers(chatRoom.participants[0], this.trainerId).subscribe((messages) => {
      console.log(messages,">>>>>>>>>Tranier")
      this.chatMessages = messages.map((msg) => ({
        sender: msg.senderId,
        content: msg.content,
        timestamp: msg.timestamp,
      }));
    });
  }

  sendMessage(): void {
    if (this.messageContent.trim()) {
      const content = this.messageContent.trim();
      const senderId = this.trainerId;
      const recipientId = this.selectedChatRoom.participants[0];
      const chatRoomId = `${senderId}_${recipientId}`;

      this.communicationService.sendPrivateMessage(senderId, recipientId, chatRoomId, content);

      this.chatMessages.push({
        sender: senderId,
        content,
        timestamp: new Date().toISOString(),
      });

      this.messageContent = '';
    }
  }
}  

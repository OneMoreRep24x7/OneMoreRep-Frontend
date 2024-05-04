import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../services/communication.service';
import { ChatService } from '../../../services/chat.service';
import { Trainer } from '../../../model/trainer.model';

interface ChatMessage {
  sender: string;
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit {
  trainer: Trainer;
  trainerId: string;
  chatRooms: any[] = [];
  selectedChatRoom: any = null;
  chatMessages: ChatMessage[] = [];
  messageContent = '';

  constructor(
    private communicationService: CommunicationService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    // Get trainer information
    this.trainer = JSON.parse(sessionStorage.getItem('user'));
    this.trainerId = this.trainer.id;

    // Fetch chat rooms for the trainer
    this.chatService.getChatRoomsForTrainer(this.trainerId).subscribe((rooms) => {
      this.chatRooms = rooms;
      console.log(this.chatRooms,">>>>>>>");

      
    });

    // Subscribe to WebSocket messages
    this.communicationService.message$.subscribe((msg) => {
      const receivedMessage = JSON.parse(msg);
      if (this.selectedChatRoom && receivedMessage.chatRoomId === this.selectedChatRoom.id && receivedMessage.senderId !== this.trainerId) {
        this.chatMessages.push(receivedMessage);
      }
    });
  }

  selectChatRoom(chatRoom: any): void {
    this.selectedChatRoom = chatRoom;
    if (this.selectedChatRoom) {
      this.communicationService.disconnect();
    }

    console.log(chatRoom.id,"ChtRomm");

    this.selectedChatRoom = chatRoom;
    console.log(this.selectChatRoom,"SElected")



    // Connect to the selected chat room
    
    
    this.communicationService.connect(`${chatRoom.id}`);

    // Load previous messages
    this.chatService.getMessagesBetweenUsers(chatRoom.participants[1], this.trainerId).subscribe((messages) => {
      this.chatMessages = messages.map((msg) => ({
        sender: msg.senderId,
        content: msg.content,
        timestamp: msg.timestamp,
      }));
    });
  }

  containsUrl(text: string): boolean {
    const urlPattern = /(https?:\/\/[^\s]+)/g; // Regular expression to detect URLs
    return urlPattern.test(text);
  }

  extractUrl(text: string): string | null {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlPattern);
    return matches ? matches[0] : null;
  }

  sendMessage(): void {
    console.log("send message triggerd");
    
    if (this.messageContent.trim()) {
      const content = this.messageContent.trim();
      const senderId = this.trainerId;
      const recipientId = this.selectedChatRoom.participants[1];

      // Send the message
      this.communicationService.sendPrivateMessage(
        senderId,
        recipientId,
        `${senderId}_${recipientId}`,
        content
      );

      // Add to local message history
      this.chatMessages.push({
        sender: senderId,
        content,
        timestamp: new Date().toISOString(),
      });

      this.messageContent = ''; // Reset the message content
    }
  }
}

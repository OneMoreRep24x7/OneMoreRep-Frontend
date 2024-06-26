import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../../services/communication.service';
import { User } from '../../../model/User.model';
import { Trainer } from '../../../model/trainer.model';
import { UserService } from '../../../services/user.service';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-connect-trainer',
  templateUrl: './connect-trainer.component.html',
  styleUrls: ['./connect-trainer.component.scss']
})
export class ConnectTrainerComponent implements OnInit {
  user: User | null = null;
  userId:string|null;
  trainer: Trainer | null = null;
  chatMessages: { sender: string; content: string; timestamp: string }[] = [];
  messageContent: string = '';
  currentDate:any = Date.now()

  constructor(
    private communicationService: CommunicationService,
    private userService: UserService,
    private chatService: ChatService
  ) {}


  ngOnInit(): void {
    window.scrollTo(0,0)
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userId = this.user?.id ?? '';

    if (this.userId) {
      this.userService.getUserTrainer(this.userId).subscribe((trainer) => {
        this.trainer = trainer;

        if (this.trainer) {
          const trainerId = this.trainer.id;
          const chatRoomId = `${this.userId}_${trainerId}`;

          this.chatService.getMessagesBetweenUsers(this.userId, trainerId).subscribe((messages) => {
            console.log(messages,"Message>>>>>>")
            this.chatMessages = messages.map((msg) => ({
              sender: msg.senderId,
              content: msg.content,  // Correctly referencing the 'content' property
              timestamp: msg.timestamp,
            }));
          });
          
         

          // Connect to WebSocket
          this.communicationService.connect(chatRoomId);

          // Subscribe to new messages
          this.communicationService.message$.subscribe((msg) => {
            console.log(msg,"Message>>>>>>>form queu")
            const receivedMessage = JSON.parse(msg);
            if(receivedMessage.senderId !== this.userId){
              this.chatMessages.push({
                sender: receivedMessage.senderId,
                content: receivedMessage.content,
                timestamp: receivedMessage.timestamp,
              });
            }
            
          });
        }
      });
    }
  }

  sendMessage(): void {
    if (this.messageContent.trim() && this.trainer && this.user) {
       
      const content = this.messageContent.trim();
      const senderId = this.user.id;
      const recipientId = this.trainer.id;
      const chatRoomId = `${senderId}_${recipientId}`;
      

      this.communicationService.sendPrivateMessage(senderId, recipientId, chatRoomId,content);

      this.chatMessages.push({
        sender: senderId,
        content,
        timestamp: new Date().toISOString(),
      });
     

      this.messageContent = ''; // Clear the input after sending

    }
  }
 
}

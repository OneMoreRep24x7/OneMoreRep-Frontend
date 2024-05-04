import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ChatMessage, ChatUserRegisterRequest } from '../model/chat.modle';


@Injectable({
  providedIn: 'root',
})
export class ChatService {
 
  private baseUrl = 'api/v1/chats';

  constructor(private http: HttpClient) {}

  // Method to register a new chat user
  registerUser(data: ChatUserRegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  // Method to get chat messages between a user and a trainer
  getMessagesBetweenUsers(
    userId: string,
    trainerId: string
  ): Observable<ChatMessage[]> {
    const requestBody = {
      userId,
      trainerId,
    };
    return this.http.post<ChatMessage[]>(`${this.baseUrl}/getMessages`, requestBody);
  }
  
  getChatRoomsForTrainer(trainerId: string): Observable<any[]> {
    const url = `${this.baseUrl}/chat-rooms?trainerId=${trainerId}`;
    return this.http.get<any[]>(url);
  }
}

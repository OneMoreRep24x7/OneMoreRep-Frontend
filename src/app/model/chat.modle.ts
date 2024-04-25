export interface ChatUserRegisterRequest{
    userId:string,
    userFistName:string,
    userLastName:string,
    trainerId:string,
    trainerFirstName:string,
    trainerLastName:string,
}

export interface ChatMessage {
    id: string; // The ID of the message (if needed)
    senderId: string; // ID of the sender
    recipientId: string; // ID of the recipient
    content: string; // Content of the message
    timestamp: string; // Timestamp when the message was sent
    chatRoomId:string
  }
  
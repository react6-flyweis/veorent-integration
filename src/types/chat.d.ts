interface IMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
  type: "text" | "image";
}

interface IConversation {
  id: string;
  participants: string[];
  participantDetails: {
    [userId: string]: {
      name: string;
      avatar: string;
      email: string;
    };
  };
  lastMessage?: IMessage;
  createdAt: number;
  updatedAt: number;
}

interface IFirebaseConversation extends IConversation {
  messages?: IMessage[];
}

// Display interface for chat components
interface IChatDisplay {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
}

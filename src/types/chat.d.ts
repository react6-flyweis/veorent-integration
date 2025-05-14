interface IMessage {
  sender: "me" | "them";
  time: string;
  content: string;
}

interface IConversation {
  name: string;
  message: string;
  time: string;
  avatar: string;
  messages: IMessage[];
}

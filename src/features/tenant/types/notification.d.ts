interface INotification {
  _id: string;
  recipient: IUser["_id"];
  title: string;
  content: string;
  sendVia: "NOTIFICATION" | "EMAIL";
  status: "unread" | "read";
  expireIn: Date; // Expiration date
  createdAt: Date; // Creation date
  __v?: number;
}

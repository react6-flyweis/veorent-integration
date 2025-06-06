interface INotificationChannel {
  Email: boolean;
  Call: boolean;
  PushNotification: boolean;
}

interface INotificationPreferences {
  platformUpdates: INotificationChannel;
  promotions: INotificationChannel;
  weeklyNewsletter: INotificationChannel;
  webinarsAndEvents: INotificationChannel;
  messagesFromRenters: INotificationChannel;
  property: INotificationChannel;
  leads: INotificationChannel;
  applicants: INotificationChannel;
  leases: INotificationChannel;
  payments: INotificationChannel;
  feedback: INotificationChannel;
  _id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

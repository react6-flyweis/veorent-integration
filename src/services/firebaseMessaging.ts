import {
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export class FirebaseMessagingService {
  private conversationsCollection = collection(db, "conversations");
  private messagesCollection = collection(db, "messages");

  // Create a new conversation
  async createConversation(
    currentUserId: string,
    contactUserId: string,
    currentUserDetails: { name: string; avatar: string; email: string },
    contactDetails: { name: string; avatar: string; email: string },
  ): Promise<string> {
    try {
      // Check if conversation already exists
      const existingConversation = await this.getExistingConversation(
        currentUserId,
        contactUserId,
      );

      if (existingConversation) {
        return existingConversation.id;
      }

      // Create new conversation
      const conversationData = {
        participants: [currentUserId, contactUserId],
        participantDetails: {
          [currentUserId]: currentUserDetails,
          [contactUserId]: contactDetails,
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        this.conversationsCollection,
        conversationData,
      );
      return docRef.id;
    } catch (error) {
      console.error("Error creating conversation:", error);
      throw error;
    }
  }

  // Get existing conversation between two users
  async getExistingConversation(
    userId1: string,
    userId2: string,
  ): Promise<IConversation | null> {
    try {
      const q = query(
        this.conversationsCollection,
        where("participants", "array-contains", userId1),
      );

      const querySnapshot = await getDocs(q);

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        if (data.participants.includes(userId2)) {
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toMillis
              ? data.createdAt.toMillis()
              : Date.now(),
            updatedAt: data.updatedAt?.toMillis
              ? data.updatedAt.toMillis()
              : Date.now(),
          } as IConversation;
        }
      }

      return null;
    } catch (error) {
      console.error("Error getting existing conversation:", error);
      throw error;
    }
  }

  // Get all conversations for a user with error handling
  getUserConversations(
    userId: string,
    callback: (conversations: IConversation[]) => void,
  ): () => void {
    const q = query(
      this.conversationsCollection,
      where("participants", "array-contains", userId),
      orderBy("updatedAt", "desc"),
    );

    return onSnapshot(
      q,
      (querySnapshot) => {
        const conversations: IConversation[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          conversations.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toMillis
              ? data.createdAt.toMillis()
              : Date.now(),
            updatedAt: data.updatedAt?.toMillis
              ? data.updatedAt.toMillis()
              : Date.now(),
          } as IConversation);
        });
        callback(conversations);
      },
      (error) => {
        console.error("Error listening to conversations:", error);
        // Call callback with empty array to prevent app crash
        callback([]);
      },
    );
  }

  // Send a message
  async sendMessage(
    conversationId: string,
    senderId: string,
    senderName: string,
    content: string,
    type: "text" | "image" = "text",
  ): Promise<void> {
    try {
      const messageData: Omit<IMessage, "id"> = {
        senderId,
        senderName,
        content,
        type,
        timestamp: Date.now(),
      };

      // Add message to messages collection
      await addDoc(this.messagesCollection, {
        ...messageData,
        conversationId,
        createdAt: serverTimestamp(),
      });

      // Update conversation's last message and updatedAt
      const conversationRef = doc(this.conversationsCollection, conversationId);
      await updateDoc(conversationRef, {
        lastMessage: messageData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  // Get messages for a conversation with error handling
  getConversationMessages(
    conversationId: string,
    callback: (messages: IMessage[]) => void,
  ): () => void {
    const q = query(
      this.messagesCollection,
      where("conversationId", "==", conversationId),
      orderBy("timestamp", "asc"),
    );

    return onSnapshot(
      q,
      (querySnapshot) => {
        const messages: IMessage[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          messages.push({
            id: doc.id,
            ...data,
          } as IMessage);
        });
        callback(messages);
      },
      (error) => {
        console.error("Error listening to messages:", error);
        // Call callback with empty array to prevent app crash
        callback([]);
      },
    );
  }

  // Get conversation by ID
  async getConversationById(
    conversationId: string,
  ): Promise<IConversation | null> {
    try {
      const docRef = doc(this.conversationsCollection, conversationId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toMillis
            ? data.createdAt.toMillis()
            : Date.now(),
          updatedAt: data.updatedAt?.toMillis
            ? data.updatedAt.toMillis()
            : Date.now(),
        } as IConversation;
      }

      return null;
    } catch (error) {
      console.error("Error getting conversation:", error);
      throw error;
    }
  }
}

export const firebaseMessagingService = new FirebaseMessagingService();

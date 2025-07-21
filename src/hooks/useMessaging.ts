import { useState, useEffect, useCallback } from "react";

import type { FirebaseMessagingService } from "@/services/firebaseMessaging";
import { useAuthStore } from "@/store/useAuthStore";

// Lazy load Firebase messaging service
let firebaseMessagingService: FirebaseMessagingService | null = null;
const getFirebaseMessagingService =
  async (): Promise<FirebaseMessagingService> => {
    if (!firebaseMessagingService) {
      const { firebaseMessagingService: service } = await import(
        "@/services/firebaseMessaging"
      );
      firebaseMessagingService = service;
    }
    return firebaseMessagingService;
  };

export function useMessaging() {
  const user = useAuthStore((state) => state.user);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user conversations
  useEffect(() => {
    if (!user?._id) return;

    setLoading(true);

    const loadConversations = async () => {
      try {
        const service = await getFirebaseMessagingService();
        const unsubscribe = service.getUserConversations(
          user._id,
          (updatedConversations) => {
            setConversations(updatedConversations);
            setLoading(false);
          },
        );

        return unsubscribe;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load conversations",
        );
        setLoading(false);
        return () => {};
      }
    };

    let unsubscribe: (() => void) | null = null;

    loadConversations().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user?._id]);

  // Create or get existing conversation
  const createConversation = useCallback(
    async (
      contactUserId: string,
      contactDetails: { name: string; avatar: string; email: string },
    ) => {
      if (!user) throw new Error("User not authenticated");

      try {
        const service = await getFirebaseMessagingService();
        const currentUserDetails = {
          name: user.fullName || `${user.firstname} ${user.lastname}`.trim(),
          avatar: user.image || "/assets/user.jpg",
          email: user.email,
        };

        const conversationId = await service.createConversation(
          user._id,
          contactUserId,
          currentUserDetails,
          contactDetails,
        );

        return conversationId;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to create conversation",
        );
        throw err;
      }
    },
    [user],
  );

  // Send message
  const sendMessage = useCallback(
    async (
      conversationId: string,
      content: string,
      type: "text" | "image" = "text",
    ) => {
      if (!user) throw new Error("User not authenticated");

      try {
        const service = await getFirebaseMessagingService();
        const senderName =
          user.fullName || `${user.firstname} ${user.lastname}`.trim();
        await service.sendMessage(
          conversationId,
          user._id,
          senderName,
          content,
          type,
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to send message");
        throw err;
      }
    },
    [user],
  );

  return {
    conversations,
    loading,
    error,
    createConversation,
    sendMessage,
    clearError: () => setError(null),
  };
}

export function useConversationMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    setLoading(true);

    const loadMessages = async () => {
      try {
        const service = await getFirebaseMessagingService();
        const unsubscribe = service.getConversationMessages(
          conversationId,
          (updatedMessages) => {
            setMessages(updatedMessages);
            setLoading(false);
          },
        );

        return unsubscribe;
      } catch (err) {
        console.error("Failed to load messages:", err);
        setLoading(false);
        return () => {};
      }
    };

    let unsubscribe: (() => void) | null = null;

    loadMessages().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [conversationId]);

  return { messages, loading };
}

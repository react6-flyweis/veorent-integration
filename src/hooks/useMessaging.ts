import { useState, useEffect, useCallback } from "react";

import { firebaseMessagingService } from "@/services/firebaseMessaging";
import { useAuthStore } from "@/store/useAuthStore";

export function useMessaging() {
  const user = useAuthStore((state) => state.user);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user conversations
  useEffect(() => {
    if (!user?._id) return;

    setLoading(true);
    const unsubscribe = firebaseMessagingService.getUserConversations(
      user._id,
      (updatedConversations) => {
        setConversations(updatedConversations);
        setLoading(false);
      },
    );

    return () => {
      unsubscribe();
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
        const currentUserDetails = {
          name: user.fullName || `${user.firstname} ${user.lastname}`.trim(),
          avatar: user.image || "/assets/user.jpg",
          email: user.email,
        };

        const conversationId =
          await firebaseMessagingService.createConversation(
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
        const senderName =
          user.fullName || `${user.firstname} ${user.lastname}`.trim();
        await firebaseMessagingService.sendMessage(
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
    const unsubscribe = firebaseMessagingService.getConversationMessages(
      conversationId,
      (updatedMessages) => {
        setMessages(updatedMessages);
        setLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [conversationId]);

  return { messages, loading };
}

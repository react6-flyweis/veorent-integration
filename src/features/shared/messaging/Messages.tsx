import { useState } from "react";
import {
  ChatLayout,
  ChatLayoutSidebar,
  ChatLayoutMain,
  ChatLayoutHeader,
} from "./components/ChatLayout";
import { ChatSidebar, ChatSidebarContent } from "./components/ChatSidebar";
import { ChatSidebarItem } from "./components/ChatSidebarItem";
import { ChatMain } from "./components/ChatMain";
import { PageTitle } from "@/components/PageTitle";

const conversations: IConversation[] = [
  {
    name: "Ellen Lambert",
    message: "Hey! How's it going?",
    time: "04:04AM",
    avatar: "/avatars/ellen.jpg",
    messages: [
      {
        sender: "them",
        time: "01:15 PM",
        content: "Hey! How's it going?",
      },
      {
        sender: "me",
        time: "01:16 PM",
        content: "I'm doing great! How about you?",
      },
    ],
  },
  {
    name: "Connor Frazier",
    message: "What kind of music do you like?",
    time: "08:56PM",
    avatar: "/avatars/connor.jpg",
    messages: [
      {
        sender: "them",
        time: "01:15 PM",
        content: "What kind of music do you like?",
      },
      {
        sender: "me",
        time: "01:16 PM",
        content: "I enjoy a variety of music genres!",
      },
    ],
  },
  {
    name: "Ashlynn Donin",
    message: "Sounds good to me!",
    time: "11:35PM",
    avatar: "/avatars/ashlynn.jpg",
    messages: [
      {
        sender: "them",
        time: "01:15 PM",
        content: "Sounds good to me!",
      },
      {
        sender: "me",
        time: "01:16 PM",
        content: "Great! Let's do it.",
      },
    ],
  },
  {
    name: "Dulce Botosh",
    message: "Sounds good to me!",
    time: "11:35PM",
    avatar: "/avatars/dulce.jpg",
    messages: [
      {
        sender: "them",
        time: "01:15 PM",
        content: "Sounds good to me!",
      },
      {
        sender: "me",
        time: "01:16 PM",
        content: "Awesome! Looking forward to it.",
      },
    ],
  },
  {
    name: "Talan Geidt",
    message: "Sounds good to me!",
    time: "11:35PM",
    avatar: "/avatars/talan.jpg",
    messages: [
      {
        sender: "them",
        time: "01:15 PM",
        content: "Sounds good to me!",
      },
      {
        sender: "me",
        time: "01:16 PM",
        content: "Sure thing! Let's make it happen.",
      },
    ],
  },
  {
    name: "Josephine Gordon",
    message: "Sounds good to me!",
    time: "11:35PM",
    avatar: "/avatars/josephine.jpg",
    messages: [
      {
        sender: "them",
        time: "01:15 PM",
        content: "Sounds good to me!",
      },
      {
        sender: "me",
        time: "01:16 PM",
        content: "Definitely! Can't wait.",
      },
    ],
  },
];

export default function Messages() {
  const [selectedChatIndex, setSelectedChatIndex] = useState(0);
  const [showMainChat, setShowMainChat] = useState(false);
  const selectedChat = conversations[selectedChatIndex];

  const handleChatSelect = (idx: number) => {
    setSelectedChatIndex(idx);
    // Show main chat in mobile/small container view
    setShowMainChat(true);
  };

  const handleBackToSidebar = () => {
    setShowMainChat(false);
  };

  return (
    <ChatLayout>
      <ChatLayoutHeader className="mb-4">
        <PageTitle title="Message" className="hidden @md:flex" />
      </ChatLayoutHeader>
      <ChatLayoutSidebar showOnMobile={!showMainChat}>
        <ChatSidebar>
          <ChatSidebarContent>
            {conversations.map((chat, idx) => (
              <ChatSidebarItem
                key={idx}
                chat={chat}
                isSelected={selectedChatIndex === idx}
                onClick={() => handleChatSelect(idx)}
              />
            ))}
          </ChatSidebarContent>
        </ChatSidebar>
      </ChatLayoutSidebar>

      <ChatLayoutMain showOnMobile={showMainChat}>
        <ChatMain
          selectedChat={selectedChat}
          onBackClick={handleBackToSidebar}
        />
      </ChatLayoutMain>
    </ChatLayout>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Mic, Send } from "lucide-react";
import { useState, useRef } from "react";

export function ChatToolbar() {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // TODO: Implement message sending logic
    console.log("Sending message:", message);
    setMessage("");
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      // TODO: Implement file handling logic
      console.log("Selected files:", files);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t p-3 flex items-center space-x-2">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        multiple
      />
      <Button variant="ghost" size="icon" onClick={handleFileSelect}>
        <Paperclip className="w-5 h-5" />
      </Button>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a Message"
        className="flex-1 rounded-full"
      />
      <Button variant="ghost" size="icon">
        <Mic className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSendMessage}
        disabled={!message.trim()}
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
}

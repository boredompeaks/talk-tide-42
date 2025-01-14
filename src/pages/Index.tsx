import { useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";

const Index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hey! How are you?",
      timestamp: "12:30",
      isOwn: false,
    },
    {
      id: 2,
      content: "I'm good, thanks! How about you?",
      timestamp: "12:31",
      isOwn: true,
    },
    {
      id: 3,
      content: "Great! Just working on some new features.",
      timestamp: "12:32",
      isOwn: false,
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Alice Smith</h2>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              timestamp={message.timestamp}
              isOwn={message.isOwn}
            />
          ))}
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Index;
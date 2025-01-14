import { useState, useEffect } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Welcome to the chat! 👋",
      timestamp: "12:30",
      isOwn: false,
    },
  ]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: "2-digit", 
        minute: "2-digit" 
      }),
      isOwn: true,
    };
    setMessages([...messages, newMessage]);
  };

  const handleFileUpload = async (file: File) => {
    if (file) {
      try {
        // In a real app, you would upload to a server here
        const objectUrl = URL.createObjectURL(file);
        
        let content = "";
        if (file.type.startsWith("image")) {
          content = `<img src="${objectUrl}" alt="uploaded" class="max-w-xs rounded-lg" />`;
        } else {
          content = `<div class="flex items-center space-x-2 p-2 bg-white/10 rounded-lg">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            <span>${file.name}</span>
          </div>`;
        }
        
        const newMessage = {
          id: messages.length + 1,
          content,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),
          isOwn: true,
        };
        
        setMessages([...messages, newMessage]);
        toast.success("File uploaded successfully!");
      } catch (error) {
        toast.error("Failed to upload file");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5')] 
        bg-cover bg-center bg-no-repeat"
        style={{ filter: 'brightness(0.6)' }}
      />
      
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="ghost" 
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="flex h-screen relative z-0">
        <ChatSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
        <div className="flex-1 flex flex-col backdrop-blur-md bg-white/30">
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
          <ChatInput onSendMessage={handleSendMessage} onFileSelect={handleFileUpload} />
        </div>
      </div>
    </div>
  );
};

export default Index;
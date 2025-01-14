import { useState, useEffect } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

  const navigate = useNavigate();

  // Check for authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: messages.length + 1,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    };
    setMessages([...messages, newMessage]);
  };

  const handleFileUpload = (file: File) => {
    if (file) {
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      
      // Add file message
      const newMessage = {
        id: messages.length + 1,
        content: file.type.startsWith('image') 
          ? `<img src="${objectUrl}" alt="uploaded" class="max-w-xs rounded-lg" />`
          : `File: ${file.name}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      };
      
      setMessages([...messages, newMessage]);
      toast.success("File uploaded successfully!");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 overflow-hidden">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05')] 
        bg-cover bg-center bg-no-repeat"
        style={{ filter: 'brightness(0.6)' }}
      />
      
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button 
          variant="ghost" 
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
          onClick={() => navigate('/login')}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
        <Button 
          variant="ghost" 
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
          onClick={() => navigate('/register')}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Register
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
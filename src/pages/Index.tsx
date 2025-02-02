import { useState, useEffect } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation } from "@tanstack/react-query";

const Index = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: messages = [], refetch: refetchMessages } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async ({ content, mediaUrl }: { 
      content: string;
      mediaUrl?: string;
    }) => {
      if (!session?.user) return;
      
      const { error } = await supabase.from('messages').insert({
        content,
        sender_id: session.user.id,
        media_url: mediaUrl
      });

      if (error) throw error;
    },
    onSuccess: () => {
      refetchMessages();
      toast.success('Message sent successfully');
    },
    onError: (error) => {
      toast.error('Failed to send message');
      console.error('Error sending message:', error);
    },
  });

  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!session?.user) return;
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('chat-attachments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('chat-attachments')
        .getPublicUrl(filePath);

      return publicUrl;
    },
    onSuccess: (publicUrl, file) => {
      if (!publicUrl) return;
      sendMessageMutation.mutate({
        content: file.name,
        mediaUrl: publicUrl,
      });
    },
    onError: (error) => {
      toast.error('Failed to upload file');
      console.error('Error uploading file:', error);
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleSendMessage = (content: string) => {
    sendMessageMutation.mutate({ content });
  };

  const handleFileUpload = async (file: File) => {
    uploadFileMutation.mutate(file);
  };

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        () => {
          refetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
        <ChatSidebar 
          isCollapsed={isCollapsed} 
          onToggle={() => setIsCollapsed(!isCollapsed)}
          onSelectConversation={setSelectedConversation}
        />
        <div className="flex-1 flex flex-col backdrop-blur-md bg-white/30">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                timestamp={new Date(message.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
                isOwn={message.sender_id === session?.user?.id}
                attachmentUrl={message.media_url}
                attachmentType={message.media_url ? 'image' : undefined}
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
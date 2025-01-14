import { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-white/20 p-4 backdrop-blur-sm bg-white/10">
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-white/20 text-white placeholder-white/60 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="button"
          className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
        >
          <Smile className="w-5 h-5" />
        </button>
        <button
          type="submit"
          className="p-2 bg-primary hover:bg-primary/90 rounded-full transition-colors"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
};
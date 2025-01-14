import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  timestamp: string;
  isOwn?: boolean;
}

export const ChatMessage = ({ content, timestamp, isOwn = false }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex mb-4 animate-message-appear",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2",
          isOwn
            ? "bg-primary text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        )}
      >
        <p className="text-sm">{content}</p>
        <span
          className={cn(
            "text-xs mt-1 block",
            isOwn ? "text-primary-foreground/80" : "text-gray-500"
          )}
        >
          {timestamp}
        </span>
      </div>
    </div>
  );
};
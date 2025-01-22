import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  timestamp: string;
  isOwn?: boolean;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'video' | 'document' | 'audio';
}

export const ChatMessage = ({ 
  content, 
  timestamp, 
  isOwn = false,
  attachmentUrl,
  attachmentType
}: ChatMessageProps) => {
  const renderAttachment = () => {
    if (!attachmentUrl) return null;

    switch (attachmentType) {
      case 'image':
        return (
          <img 
            src={attachmentUrl} 
            alt={content}
            className="max-w-xs rounded-lg mb-2"
          />
        );
      case 'video':
        return (
          <video 
            src={attachmentUrl} 
            controls 
            className="max-w-xs rounded-lg mb-2"
          />
        );
      case 'audio':
        return (
          <audio 
            src={attachmentUrl} 
            controls 
            className="max-w-xs mb-2"
          />
        );
      case 'document':
        return (
          <a 
            href={attachmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            <span>{content}</span>
          </a>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "flex mb-4 animate-message-appear",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2 backdrop-blur-sm",
          isOwn
            ? "bg-primary/80 text-white rounded-br-none"
            : "bg-white/80 text-gray-800 rounded-bl-none"
        )}
      >
        {renderAttachment()}
        <div className="text-sm">{content}</div>
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
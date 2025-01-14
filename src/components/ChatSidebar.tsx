import { useState } from "react";
import { Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const ChatSidebar = ({ isCollapsed, onToggle }: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const contacts = [
    { id: 1, name: "Alice Smith", status: "online", lastMessage: "Hey there!" },
    { id: 2, name: "Bob Johnson", status: "offline", lastMessage: "See you tomorrow" },
    { id: 3, name: "Carol White", status: "online", lastMessage: "Thanks!" },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-20" : "w-80"
      )}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && <h1 className="text-xl font-bold text-gray-800">Chats</h1>}
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        {!isCollapsed && (
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-8 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-2 top-3" />
          </div>
        )}
      </div>
      <div className="overflow-y-auto h-[calc(100vh-5rem)]">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            {isCollapsed ? (
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {contact.name[0]}
                  </div>
                  <div
                    className={cn(
                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                      contact.status === "online" ? "bg-green-500" : "bg-gray-400"
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {contact.name[0]}
                  </div>
                  <div
                    className={cn(
                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white",
                      contact.status === "online" ? "bg-green-500" : "bg-gray-400"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-gray-400">12:34</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
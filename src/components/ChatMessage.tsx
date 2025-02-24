
import React from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: string;
  isRead?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[75%] rounded-lg px-4 py-2 ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
      }`}>
        <p className="text-sm">{message.text}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;

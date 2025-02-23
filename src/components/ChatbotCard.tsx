
import React from 'react';
import { Card } from '@/components/ui/card';

interface ChatbotCardProps {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
}

const ChatbotCard = ({ title, description, category, imageUrl }: ChatbotCardProps) => {
  return (
    <Card className="glass-card overflow-hidden hover-lift group">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/90 text-gray-800">
            {category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Card>
  );
};

export default ChatbotCard;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import ChatbotCard from '@/components/ChatbotCard';
import CategoryFilter from '@/components/CategoryFilter';

const CATEGORIES = ['AI Assistant', 'Customer Service', 'Education', 'Entertainment'];

const CHATBOTS = [
  {
    id: 1,
    title: 'SmartAssist AI',
    description: 'Your intelligent personal assistant for daily tasks and queries.',
    category: 'AI Assistant',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'EduBot Pro',
    description: 'Interactive learning companion for students of all ages.',
    category: 'Education',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'CustomerCare AI',
    description: '24/7 customer support automation for businesses.',
    category: 'Customer Service',
    imageUrl: '/placeholder.svg',
  },
  {
    id: 4,
    title: 'EntertainBot',
    description: 'Your virtual entertainment companion for fun conversations.',
    category: 'Entertainment',
    imageUrl: '/placeholder.svg',
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const filteredChatbots = CHATBOTS.filter(
    (bot) => selectedCategory === 'all' || bot.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => navigate('/settings')}
          className="p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-colors shadow-lg hover-lift"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6 text-gray-700" />
        </button>
      </div>
      
      <HeroSection />
      
      <main className="container px-4 py-16 mx-auto">
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChatbots.map((bot) => (
            <div key={bot.id} className="animate-fadeIn" style={{ animationDelay: `${bot.id * 0.1}s` }}>
              <ChatbotCard {...bot} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;

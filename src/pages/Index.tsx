
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Home } from 'lucide-react';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  const navigate = useNavigate();

  const redirectToChatGPT = () => {
    window.location.href = 'https://chat.openai.com';
  };

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
        <div className="flex justify-center">
          <button
            onClick={redirectToChatGPT}
            className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-lg text-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-200"
          >
            <Home className="w-6 h-6" />
            Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default Index;

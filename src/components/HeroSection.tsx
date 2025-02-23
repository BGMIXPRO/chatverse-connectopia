
import React from 'react';
import { ExternalLink, Share2 } from 'lucide-react';

const HeroSection = () => {
  const redirectToChatGPT = () => {
    window.location.href = 'https://chat.openai.com';
  };

  const redirectToTelegram = () => {
    window.location.href = 'https://t.me/MOINVIPDDOS';
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white pointer-events-none" />
      <div className="container px-4 mx-auto text-center relative z-10">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-gray-100 rounded-full animate-fadeIn">
          Welcome to ChatVerse Bot Hub
        </span>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slideIn">
          Discover Intelligent Conversations
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-slideIn" style={{ animationDelay: '0.2s' }}>
          Explore our curated collection of chatbots designed to enhance your digital experience
        </p>
        <div className="flex justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={redirectToChatGPT}
            className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            Explore Bots
          </button>
          <button 
            onClick={redirectToTelegram}
            className="flex items-center gap-2 px-8 py-3 bg-white text-gray-900 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Join Telegram
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

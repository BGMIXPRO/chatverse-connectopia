
import React from 'react';

const HeroSection = () => {
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
          <button className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
            Explore Bots
          </button>
          <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

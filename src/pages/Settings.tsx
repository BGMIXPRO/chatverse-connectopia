
import React from 'react';
import PremiumCard from '@/components/PremiumCard';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container px-4 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">Settings</h1>
        
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8">Premium Features</h2>
          <PremiumCard />
        </div>
      </div>
    </div>
  );
};

export default Settings;

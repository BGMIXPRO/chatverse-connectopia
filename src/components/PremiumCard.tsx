
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check, Crown, Timer } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const PremiumCard = () => {
  const { toast } = useToast();

  const handlePaymentClick = () => {
    // Open UPI payment
    const upiUrl = "upi://pay?pa=8604328478@paytm&pn=ChatVersePremium&am=299&cu=INR";
    window.location.href = upiUrl;
    
    toast({
      title: "Payment Initiated",
      description: "After successful payment, premium features will be activated within 3 hours.",
    });
  };

  return (
    <Card className="glass-card p-6 max-w-md mx-auto">
      <div className="flex items-center justify-center mb-6">
        <Crown className="w-12 h-12 text-purple-500" />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">ChatVerse Premium</h2>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <Check className="w-5 h-5 text-green-500" />
          <span>Unlimited Messages</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="w-5 h-5 text-green-500" />
          <span>No Restrictions</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="w-5 h-5 text-green-500" />
          <span>Full Emoji Support 🎉</span>
        </div>
        <div className="flex items-center gap-3">
          <Check className="w-5 h-5 text-green-500" />
          <span>Priority Support</span>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="text-3xl font-bold mb-2">₹299</div>
        <div className="text-sm text-gray-500">One-time payment</div>
      </div>

      <button
        onClick={handlePaymentClick}
        className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
      >
        <Crown className="w-5 h-5" />
        Get Premium Now
      </button>

      <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
        <Timer className="w-4 h-4" />
        Activation time: Up to 3 hours
      </div>
    </Card>
  );
};

export default PremiumCard;

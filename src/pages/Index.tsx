
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Home, Star, MessageSquare, Shield } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import AdminPanel from '@/components/AdminPanel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [feedbackList, setFeedbackList] = useState<Array<{rating: number; feedback: string; timestamp: string;}>>([]);

  const redirectToChatGPT = () => {
    window.location.href = 'https://chat.openai.com';
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Select at least one star before submitting",
        variant: "destructive",
      });
      return;
    }

    const newFeedback = {
      rating,
      feedback,
      timestamp: new Date().toLocaleString(),
    };
    
    setFeedbackList([...feedbackList, newFeedback]);
    
    toast({
      title: "Thank you for your feedback!",
      description: "Your feedback has been submitted successfully.",
    });
    
    setIsOpen(false);
    setRating(0);
    setFeedback('');
  };

  const handleAdminAccess = () => {
    if (password === 'frontman') {
      setIsPasswordDialogOpen(false);
      setIsAdminOpen(true);
      setPassword('');
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setIsPasswordDialogOpen(true)}
          className="p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-colors shadow-lg hover-lift"
          aria-label="Admin"
        >
          <Shield className="w-6 h-6 text-gray-700" />
        </button>
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
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={redirectToChatGPT}
            className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-lg text-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-200"
          >
            <Home className="w-6 h-6" />
            Home
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Send Feedback
          </button>
        </div>
      </main>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Feedback</DialogTitle>
            <DialogDescription>
              How would you rate your experience?
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center gap-2 py-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Tell us about your experience (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px]"
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmitFeedback}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Admin Access</DialogTitle>
            <DialogDescription>
              Enter password to access admin panel
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdminAccess();
                }
              }}
            />
            <div className="flex justify-end">
              <button
                onClick={handleAdminAccess}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Access
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Admin Panel</DialogTitle>
            <DialogDescription>
              View all user feedback
            </DialogDescription>
          </DialogHeader>
          
          <AdminPanel feedbackList={feedbackList} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

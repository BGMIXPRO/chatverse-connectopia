
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Home, Star, MessageSquare, Shield } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import AdminPanel from '@/components/AdminPanel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Message } from '@/components/ChatMessage';
import ChatMessage from '@/components/ChatMessage';
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [feedbackList, setFeedbackList] = useState<Array<{rating: number; feedback: string; timestamp: string;}>>([]);
  const [messages, setMessages] = useState<Message[]>([]);

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

  const handleSendMessage = (text: string, isAdmin = false) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: isAdmin ? 'admin' : 'user',
      timestamp: new Date().toLocaleString(),
      isRead: isAdmin,
    };

    setMessages(prev => [...prev, newMsg]);

    if (!isAdmin) {
      // Simulate offline admin response
      setTimeout(() => {
        const autoResponse: Message = {
          id: Date.now().toString(),
          text: "Thanks for your message! Our admin team is currently offline. We'll get back to you as soon as possible.",
          sender: 'admin',
          timestamp: new Date().toLocaleString(),
          isRead: true,
        };
        setMessages(prev => [...prev, autoResponse]);
      }, 1000);
    }
  };

  const handleUserSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      handleSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setIsChatOpen(true)}
          className="p-3 rounded-full bg-[#007AFF] text-white hover:bg-[#0051FF] transition-colors shadow-lg hover:shadow-xl"
          aria-label="Chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setIsPasswordDialogOpen(true)}
          className="p-2 rounded-full bg-white/80 backdrop-blur-xl hover:bg-white/90 transition-colors shadow-lg hover-lift"
          aria-label="Admin"
        >
          <Shield className="w-6 h-6 text-[#007AFF]" />
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="p-2 rounded-full bg-white/80 backdrop-blur-xl hover:bg-white/90 transition-colors shadow-lg hover-lift"
          aria-label="Settings"
        >
          <Settings className="w-6 h-6 text-[#007AFF]" />
        </button>
      </div>
      
      <HeroSection />
      
      <main className="container px-4 py-16 mx-auto">
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={redirectToChatGPT}
            className="flex items-center gap-3 px-8 py-4 bg-[#007AFF] text-white rounded-xl text-xl font-semibold hover:bg-[#0051FF] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-200"
          >
            <Home className="w-6 h-6" />
            Home
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-6 py-3 text-[#007AFF] hover:text-[#0051FF] transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Send Feedback
          </button>
        </div>
      </main>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white/80 backdrop-blur-xl rounded-2xl border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Send Feedback</DialogTitle>
            <DialogDescription className="text-[#8E8E93]">
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
                    star <= rating ? 'fill-[#FFB340] text-[#FFB340]' : 'text-[#D1D1D6]'
                  }`}
                />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Tell us about your experience (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px] rounded-xl bg-[#F2F2F7] border-0 focus:ring-2 focus:ring-[#007AFF]"
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmitFeedback}
              className="px-6 py-3 bg-[#007AFF] text-white rounded-xl font-medium hover:bg-[#0051FF] transition-colors"
            >
              Submit Feedback
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white/80 backdrop-blur-xl rounded-2xl border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Admin Access</DialogTitle>
            <DialogDescription className="text-[#8E8E93]">
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
              className="rounded-xl bg-[#F2F2F7] border-0 focus:ring-2 focus:ring-[#007AFF]"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAdminAccess}
                className="px-6 py-3 bg-[#007AFF] text-white rounded-xl font-medium hover:bg-[#0051FF] transition-colors"
              >
                Access
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="sm:max-w-[700px] bg-white/80 backdrop-blur-xl rounded-2xl border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Admin Panel</DialogTitle>
            <DialogDescription className="text-[#8E8E93]">
              Manage feedback and messages
            </DialogDescription>
          </DialogHeader>
          
          <AdminPanel 
            feedbackList={feedbackList} 
            messages={messages}
            onSendMessage={(text) => handleSendMessage(text, true)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white/80 backdrop-blur-xl rounded-2xl border-0">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Chat with Support</DialogTitle>
            <DialogDescription className="text-[#8E8E93]">
              Send us a message and we'll get back to you
            </DialogDescription>
          </DialogHeader>
          
          <div className="h-[400px] flex flex-col">
            <ScrollArea className="flex-1 p-4 border rounded-xl mb-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </ScrollArea>
            <form onSubmit={handleUserSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-xl bg-[#F2F2F7] border-0 focus:ring-2 focus:ring-[#007AFF]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#007AFF] text-white rounded-xl hover:bg-[#0051FF] transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

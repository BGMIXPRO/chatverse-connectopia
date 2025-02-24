
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit2, MessageSquare } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatMessage, { Message } from './ChatMessage';
import { Input } from "@/components/ui/input";

interface Feedback {
  rating: number;
  feedback: string;
  timestamp: string;
}

interface AdminPanelProps {
  feedbackList: Feedback[];
  messages: Message[];
  onSendMessage: (text: string) => void;
}

const AdminPanel = ({ feedbackList, messages, onSendMessage }: AdminPanelProps) => {
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const handleEditToggle = () => {
    if (!isEditMode) {
      // Initialize edit mode by enabling GPT Engineer's edit functionality
      try {
        // @ts-ignore - GPT Engineer's global function
        window.enableEditMode?.();
        setIsEditMode(true);
        toast({
          title: "Edit Mode Enabled",
          description: "Click on any text on the page to edit it",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not enable edit mode",
          variant: "destructive",
        });
      }
    } else {
      // Disable edit mode
      try {
        // @ts-ignore - GPT Engineer's global function
        window.disableEditMode?.();
        setIsEditMode(false);
        toast({
          title: "Edit Mode Disabled",
          description: "Changes have been saved",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not disable edit mode",
          variant: "destructive",
        });
      }
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <button
          onClick={handleEditToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isEditMode 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          <Edit2 className="w-4 h-4" />
          {isEditMode ? 'Exit Edit Mode' : 'Edit Page Content'}
        </button>
      </div>

      <Tabs defaultValue="feedback">
        <TabsList className="mb-4">
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            Messages
            {messages.some(m => !m.isRead && m.sender === 'user') && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {messages.filter(m => !m.isRead && m.sender === 'user').length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="feedback">
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {feedbackList.map((item, index) => (
              <div key={index} className="mb-6 pb-6 border-b last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{item.timestamp}</span>
                </div>
                <p className="text-gray-700">{item.feedback || 'No comment provided'}</p>
              </div>
            ))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="messages">
          <div className="h-[400px] flex flex-col">
            <ScrollArea className="flex-1 p-4 border rounded-md mb-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;

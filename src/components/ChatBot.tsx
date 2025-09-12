import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  X, 
  Minimize2,
  Phone,
  Mail,
  HelpCircle,
  FileText,
  Clock
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your Tribal Affairs assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickActions = [
    "Check application status",
    "Apply for PM Kisan",
    "Land patta information", 
    "Jal Jeevan Mission",
    "Contact officer",
    "Upload documents"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot', 
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('status') || input.includes('application')) {
      return 'To check your application status, please provide your Application ID (e.g., TB001234) or use the Status Checker from the main menu.';
    }
    
    if (input.includes('pm kisan') || input.includes('kisan')) {
      return 'PM Kisan Yojana provides ₹6,000 annual financial support to farmers. You can apply through our application form. Do you need help with the application process?';
    }
    
    if (input.includes('land') || input.includes('patta')) {
      return 'For land patta applications, you need to provide ownership documents, identity proof, and location details. Would you like me to guide you through the application process?';
    }
    
    if (input.includes('contact') || input.includes('officer')) {
      return 'You can contact your assigned officer through the application details page. For general inquiries, call our helpline: 1800-XXX-XXXX or email: help@tribalpotal.gov.in';
    }
    
    if (input.includes('document') || input.includes('upload')) {
      return 'Required documents include: Aadhar Card, Tribal Certificate, Income Certificate, and Bank Passbook. You can upload these during the application process.';
    }
    
    return 'I can help you with application status, government schemes, land records, and general information. Could you please be more specific about what you need help with?';
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    handleSendMessage();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-government-orange hover:bg-government-orange/90 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 shadow-xl ${isMinimized ? 'h-16' : 'h-[500px]'} transition-all duration-300`}>
        <CardHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-government-orange flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-sm">Help Assistant</CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[432px]">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-primary' 
                          : 'bg-government-orange'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-3 w-3 text-white" />
                        ) : (
                          <Bot className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-4 border-t bg-muted/30">
                <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.slice(0, 4).map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => handleQuickAction(action)}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Phone className="h-3 w-3 mr-1" />
                    Call Support
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </Button>
                </div>
                <Badge variant="secondary" className="text-xs">
                  24/7 Support
                </Badge>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatBot;
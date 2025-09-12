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
      content: 'नमस्ते! मैं आपका FRA Help Desk असिस्टेंट हूं। वन अधिकार अधिनियम 2006 के बारे में कैसे मदद कर सकता हूं? 🌲',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickActions = [
    "Forest Rights Act 2006 क्या है?",
    "Individual Forest Rights (IFR)",
    "Community Forest Rights (CFR)", 
    "आवेदन की स्थिति जांचें",
    "आवश्यक दस्तावेज़",
    "भूमि पट्टा प्रक्रिया",
    "ग्राम सभा की भूमिका",
    "अपील प्रक्रिया"
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
    
    // FRA 2006 specific responses
    if (input.includes('forest rights act') || input.includes('fra') || input.includes('वन अधिकार')) {
      return 'वन अधिकार अधिनियम 2006 वन में रहने वाले समुदायों को भूमि और वन संसाधनों पर अधिकार प्रदान करता है। यह Individual Forest Rights (IFR), Community Rights (CR), और Community Forest Resource Rights (CFR) को मान्यता देता है। क्या आप किसी विशिष्ट प्रकार के अधिकार के बारे में जानना चाहते हैं?';
    }
    
    if (input.includes('individual forest rights') || input.includes('ifr') || input.includes('व्यक्तिगत वन अधिकार')) {
      return 'Individual Forest Rights (IFR): 4 हेक्टेयर तक की कृषि भूमि के लिए व्यक्तिगत अधिकार। आवेदन के लिए आवश्यक: निवास प्रमाण, कृषि कार्य का प्रमाण, सामुदायिक समर्थन। ग्राम सभा से अनुमोदन आवश्यक है।';
    }
    
    if (input.includes('community forest rights') || input.includes('cfr') || input.includes('सामुदायिक वन अधिकार')) {
      return 'Community Forest Resource Rights (CFR): समुदाय को वन संसाधनों के सुरक्षा, प्रबंधन और उपयोग के अधिकार। इसमें लघु वनोपज, मत्स्य पालन, चारागाह शामिल हैं। ग्राम सभा द्वारा आवेदन करना होता है।';
    }
    
    if (input.includes('gram sabha') || input.includes('ग्राम सभा')) {
      return 'ग्राम सभा FRA में केंद्रीय भूमिका निभाती है: 1) अधिकारों की पहचान और सत्यापन 2) दावों का अनुमोदन 3) वन संसाधन प्रबंधन समिति का गठन 4) CFR के लिए नियम निर्धारण। सभी FRA आवेदन ग्राम सभा से होकर गुजरते हैं।';
    }
    
    if (input.includes('status') || input.includes('application') || input.includes('स्थिति')) {
      return 'आपकी आवेदन स्थिति जांचने के लिए: 1) अपना Application ID दें (जैसे TB001234) 2) मुख्य मेनू से Status Checker का उपयोग करें 3) अपने गांव के FRO से संपर्क करें। वर्तमान में आवेदन की प्रगति: भूमि सर्वेक्षण → ग्राम सभा अनुमोदन → पट्टा जारी करना।';
    }
    
    if (input.includes('document') || input.includes('दस्तावेज़')) {
      return 'FRA आवेदन के लिए आवश्यक दस्तावेज़: 1) आधार कार्ड 2) जनजातीय प्रमाण पत्र 3) निवास प्रमाण (75 साल पुराना) 4) भूमि कब्जे का प्रमाण 5) सामुदायिक समर्थन पत्र 6) वन विभाग की NOC (यदि लागू हो) 7) GPS निर्देशांक के साथ भूमि का नक्शा।';
    }
    
    if (input.includes('appeal') || input.includes('अपील')) {
      return 'FRA अपील प्रक्रिया: यदि आपका दावा खारिज हो गया है, तो आप 60 दिनों के भीतर अपील कर सकते हैं। अपील Sub-Divisional Committee (SDC) → District Level Committee (DLC) → State Level Monitoring Committee के क्रम में होती है।';
    }
    
    if (input.includes('patta') || input.includes('पट्टा')) {
      return 'FRA पट्टा प्राप्त करने की प्रक्रिया: 1) ग्राम सभा में आवेदन 2) भूमि सर्वेक्षण और सत्यापन 3) Sub-Divisional Committee की जांच 4) District Level Committee का अनुमोदन 5) पट्टा जारी करना। पूरी प्रक्रिया में 6-12 महीने लग सकते हैं।';
    }
    
    if (input.includes('contact') || input.includes('officer') || input.includes('संपर्क')) {
      return 'संपर्क जानकारी: 1) Forest Rights Officer (FRO) - गांव स्तर पर 2) Sub-Divisional Officer - तहसील स्तर 3) District Collector - जिला स्तर 4) हेल्पलाइन: 1800-XXX-XXXX 5) ईमेल: fra@tribal.gov.in। आपातकाल के लिए 24×7 सपोर्ट उपलब्ध है।';
    }
    
    if (input.includes('rejection') || input.includes('खारिज')) {
      return 'यदि आपका FRA आवेदन खारिज हो गया है: 1) कारण जानने के लिए written order मांगें 2) 60 दिन के भीतर अपील दाखिल करें 3) अतिरिक्त दस्तावेज़ तैयार करें 4) Legal aid की सहायता लें 5) NGO या कानूनी सलाहकार से मदद लें।';
    }
    
    return 'मैं वन अधिकार अधिनियम 2006, IFR/CFR आवेदन, ग्राम सभा प्रक्रिया, और FRA से संबंधित सभी जानकारी में आपकी सहायता कर सकता हूं। कृपया अपने प्रश्न को और स्पष्ट करें। आप हिंदी या अंग्रेजी में पूछ सकते हैं।';
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
                <CardTitle className="text-sm">FRA Help Desk</CardTitle>
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
                <p className="text-xs text-muted-foreground mb-2">जल्दी सहायता के लिए:</p>
                <div className="grid grid-cols-1 gap-1">
                  {quickActions.slice(0, 6).map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 justify-start"
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
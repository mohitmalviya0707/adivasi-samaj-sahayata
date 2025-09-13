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
  Clock,
  Languages
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

type Language = 'hi' | 'en' | 'od' | 'te' | 'bn';

interface LanguageContent {
  welcome: string;
  placeholder: string;
  quickHelp: string;
  callSupport: string;
  email: string;
  support247: string;
  online: string;
  quickActions: string[];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('hi');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const languageContent: Record<Language, LanguageContent> = {
    hi: {
      welcome: 'नमस्ते! मैं आपका FRA Help Desk असिस्टेंट हूं। वन अधिकार अधिनियम 2006 के बारे में कैसे मदद कर सकता हूं? 🌲',
      placeholder: 'अपना संदेश लिखें...',
      quickHelp: 'जल्दी सहायता के लिए:',
      callSupport: 'सहायता कॉल करें',
      email: 'ईमेल',
      support247: '24/7 सहायता',
      online: 'ऑनलाइन',
      quickActions: [
        "Forest Rights Act 2006 क्या है?",
        "Individual Forest Rights (IFR)",
        "Community Forest Rights (CFR)", 
        "आवेदन की स्थिति जांचें",
        "आवश्यक दस्तावेज़",
        "भूमि पट्टा प्रक्रिया"
      ]
    },
    en: {
      welcome: 'Hello! I am your FRA Help Desk Assistant. How can I help you with Forest Rights Act 2006? 🌲',
      placeholder: 'Type your message...',
      quickHelp: 'Quick Help:',
      callSupport: 'Call Support',
      email: 'Email',
      support247: '24/7 Support',
      online: 'Online',
      quickActions: [
        "What is Forest Rights Act 2006?",
        "Individual Forest Rights (IFR)",
        "Community Forest Rights (CFR)",
        "Check Application Status",
        "Required Documents",
        "Land Patta Process"
      ]
    },
    od: {
      welcome: 'ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର FRA Help Desk ସହାୟକ | ବନ ଅଧିକାର ଅଧିନିୟମ 2006 ବିଷୟରେ କିପରି ସାହାଯ୍ୟ କରିପାରିବି? 🌲',
      placeholder: 'ଆପଣଙ୍କର ସନ୍ଦେଶ ଲେଖନ୍ତୁ...',
      quickHelp: 'ଶୀଘ୍ର ସହାୟତା ପାଇଁ:',
      callSupport: 'ସହାୟତା କଲ୍ କରନ୍ତୁ',
      email: 'ଇମେଲ୍',
      support247: '24/7 ସହାୟତା',
      online: 'ଅନଲାଇନ୍',
      quickActions: [
        "ବନ ଅଧିକାର ଅଧିନିୟମ 2006 କଣ?",
        "ବ୍ୟକ୍ତିଗତ ବନ ଅଧିକାର (IFR)",
        "ସମ୍ପ୍ରଦାୟିକ ବନ ଅଧିକାର (CFR)",
        "ଆବେଦନ ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ",
        "ଆବଶ୍ୟକ ଦଲିଲ",
        "ଜମି ପଟ୍ଟା ପ୍ରକ୍ରିୟା"
      ]
    },
    te: {
      welcome: 'నమస్కారం! నేను మీ FRA Help Desk సహాయకుడను. అటవీ హక్కుల చట్టం 2006 గురించి ఎలా సహాయం చేయగలను? 🌲',
      placeholder: 'మీ సందేశాన్ని టైప్ చేయండి...',
      quickHelp: 'త్వరిత సహాయం కోసం:',
      callSupport: 'సహాయం కాల్ చేయండి',
      email: 'ఇమెయిల్',
      support247: '24/7 సహాయం',
      online: 'ఆన్‌లైన్',
      quickActions: [
        "అటవీ హక్కుల చట్టం 2006 ఏమిటి?",
        "వ్యక్తిగత అటవీ హక్కులు (IFR)",
        "సమాజిక అటవీ హక్కులు (CFR)",
        "దరఖాస్తు స్థితిని తనిఖీ చేయండి",
        "అవసరమైన పత్రాలు",
        "భూమి పట్టా ప్రక్రియ"
      ]
    },
    bn: {
      welcome: 'নমস্কার! আমি আপনার FRA Help Desk সহায়ক। বন অধিকার আইন 2006 সম্পর্কে কীভাবে সাহায্য করতে পারি? 🌲',
      placeholder: 'আপনার বার্তা টাইপ করুন...',
      quickHelp: 'দ্রুত সাহায্যের জন্য:',
      callSupport: 'সহায়তা কল করুন',
      email: 'ইমেইল',
      support247: '24/7 সহায়তা',
      online: 'অনলাইন',
      quickActions: [
        "বন অধিকার আইন 2006 কী?",
        "ব্যক্তিগত বন অধিকার (IFR)",
        "সামাজিক বন অধিকার (CFR)",
        "আবেদনের অবস্থা পরীক্ষা করুন",
        "প্রয়োজনীয় কাগজপত্র",
        "জমির পাট্টা প্রক্রিয়া"
      ]
    }
  };

  // Initialize messages when language changes
  useState(() => {
    setMessages([{
      id: '1',
      type: 'bot',
      content: languageContent[currentLanguage].welcome,
      timestamp: new Date()
    }]);
  });

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
      const botResponse = getBotResponse(inputValue, currentLanguage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot', 
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string, language: Language): string => {
    const input = userInput.toLowerCase();
    
    const responses = {
      hi: {
        fra: 'वन अधिकार अधिनियम 2006 वन में रहने वाले समुदायों को भूमि और वन संसाधनों पर अधिकार प्रदान करता है। यह Individual Forest Rights (IFR), Community Rights (CR), और Community Forest Resource Rights (CFR) को मान्यता देता है।',
        ifr: 'Individual Forest Rights (IFR): 4 हेक्टेयर तक की कृषि भूमि के लिए व्यक्तिगत अधिकार। आवेदन के लिए आवश्यक: निवास प्रमाण, कृषि कार्य का प्रमाण, सामुदायिक समर्थन।',
        cfr: 'Community Forest Resource Rights (CFR): समुदाय को वन संसाधनों के सुरक्षा, प्रबंधन और उपयोग के अधिकार। इसमें लघु वनोपज, मत्स्य पालन, चारागाह शामिल हैं।',
        status: 'आपकी आवेदन स्थिति जांचने के लिए: 1) अपना Application ID दें 2) Status Checker का उपयोग करें 3) अपने गांव के FRO से संपर्क करें।',
        documents: 'आवश्यक दस्तावेज़: 1) आधार कार्ड 2) जनजातीय प्रमाण पत्र 3) निवास प्रमाण 4) भूमि कब्जे का प्रमाण 5) सामुदायिक समर्थन पत्र।',
        default: 'मैं वन अधिकार अधिनियम 2006 से संबंधित सभी जानकारी में आपकी सहायता कर सकता हूं। कृपया अपना प्रश्न स्पष्ट करें।'
      },
      en: {
        fra: 'Forest Rights Act 2006 grants rights to forest-dwelling communities over land and forest resources. It recognizes Individual Forest Rights (IFR), Community Rights (CR), and Community Forest Resource Rights (CFR).',
        ifr: 'Individual Forest Rights (IFR): Individual rights for agricultural land up to 4 hectares. Required: residence proof, agricultural work proof, community support.',
        cfr: 'Community Forest Resource Rights (CFR): Community rights for protection, management and use of forest resources including minor forest produce, fisheries, grazing.',
        status: 'To check your application status: 1) Provide your Application ID 2) Use Status Checker 3) Contact your village FRO.',
        documents: 'Required documents: 1) Aadhaar Card 2) Tribal Certificate 3) Residence Proof 4) Land possession proof 5) Community support letter.',
        default: 'I can help you with all information related to Forest Rights Act 2006. Please clarify your question.'
      },
      od: {
        fra: 'ବନ ଅଧିକାର ଅଧିନିୟମ 2006 ବନବାସୀ ସମ୍ପ୍ରଦାୟକୁ ଜମି ଏବଂ ବନ ସମ୍ପଦ ଉପରେ ଅଧିକାର ପ୍ରଦାନ କରେ। ଏହା ବ୍ୟକ୍ତିଗତ ବନ ଅଧିକାର (IFR), ସମ୍ପ୍ରଦାୟିକ ଅଧିକାର (CR) ଏବଂ ସମ୍ପ୍ରଦାୟିକ ବନ ସମ୍ପଦ ଅଧିକାର (CFR) କୁ ସ୍ୱୀକୃତି ଦିଏ।',
        ifr: 'ବ୍ୟକ୍ତିଗତ ବନ ଅଧିକାର (IFR): 4 ହେକ୍ଟର ପର୍ଯ୍ୟନ୍ତ କୃଷି ଭୂମି ପାଇଁ ବ୍ୟକ୍ତିଗତ ଅଧିକାର। ଆବଶ୍ୟକ: ବସବାସ ପ୍ରମାଣ, କୃଷି କାର୍ଯ୍ୟର ପ୍ରମାଣ, ସମ୍ପ୍ରଦାୟିକ ସମର୍ଥନ।',
        cfr: 'ସମ୍ପ୍ରଦାୟିକ ବନ ସମ୍ପଦ ଅଧିକାର (CFR): ବନ ସମ୍ପଦର ସୁରକ୍ଷା, ପରିଚାଳନା ଏବଂ ବ୍ୟବହାର ପାଇଁ ସମ୍ପ୍ରଦାୟିକ ଅଧିକାର।',
        status: 'ଆପଣଙ୍କର ଆବେଦନ ସ୍ଥିତି ଯାଞ୍ଚ କରିବାକୁ: 1) ଆପଣଙ୍କର ଆବେଦନ ID ଦିଅନ୍ତୁ 2) Status Checker ବ୍ୟବହାର କରନ୍ତୁ।',
        documents: 'ଆବଶ୍ୟକ ଦଲିଲ: 1) ଆଧାର କାର୍ଡ 2) ଜନଜାତି ପ୍ରମାଣପତ୍ର 3) ବସବାସ ପ୍ରମାଣ 4) ଜମି ଦଖଲର ପ୍ରମାଣ।',
        default: 'ମୁଁ ବନ ଅଧିକାର ଅଧିନିୟମ 2006 ସମ୍ବନ୍ଧୀୟ ସମସ୍ତ ତଥ୍ୟରେ ସାହାଯ୍ୟ କରିପାରିବି। ଦୟାକରି ଆପଣଙ୍କର ପ୍ରଶ୍ନ ସ୍ପଷ୍ଟ କରନ୍ତୁ।'
      },
      te: {
        fra: 'అటవీ హక్కుల చట్టం 2006 అటవీ నివాస సమాజాలకు భూమి మరియు అటవీ వనరులపై హక్కులను కల్పిస్తుంది। ఇది వ్యక్తిగత అటవీ హక్కులు (IFR), సమాజిక హక్కులు (CR), మరియు సమాజిక అటవీ వనరుల హక్కులు (CFR)ను గుర్తిస్తుంది।',
        ifr: 'వ్యక్తిగత అటవీ హక్కులు (IFR): 4 హెక్టార్ల వరకు వ్యవసాయ భూమికి వ్యక్తిగత హక్కులు. అవసరం: నివాస రుజువు, వ్యవసాయ పని రుజువు, సమాజిక మద్దతు.',
        cfr: 'సమాజిక అటవీ వనరుల హక్కులు (CFR): అటవీ వనరుల రక్షణ, నిర్వహణ మరియు వినియోగానికి సమాజిక హక్కులు.',
        status: 'మీ దరఖాస్తు స్థితిని తనిఖీ చేయడానికి: 1) మీ దరఖాస్తు IDని ఇవ్వండి 2) Status Checker ఉపయోగించండి।',
        documents: 'అవసరమైన పత్రాలు: 1) ఆధార్ కార్డ్ 2) గిరిజన సర్టిఫికేట్ 3) నివాస రుజువు 4) భూమి స్వాధీన రుజువు.',
        default: 'నేను అటవీ హక్కుల చట్టం 2006 సంబంధిత అన్ని సమాచారంలో సహాయం చేయగలను. దయచేసి మీ ప్రశ్నను స్పష్టపరచండి.'
      },
      bn: {
        fra: 'বন অধিকার আইন 2006 বনবাসী সম্প্রদায়গুলিকে ভূমি ও বন সম্পদের উপর অধিকার প্রদান করে। এটি ব্যক্তিগত বন অধিকার (IFR), সামাজিক অধিকার (CR), এবং সামাজিক বন সম্পদ অধিকার (CFR) স্বীকার করে।',
        ifr: 'ব্যক্তিগত বন অধিকার (IFR): ৪ হেক্টর পর্যন্ত কৃষি জমির জন্য ব্যক্তিগত অধিকার। প্রয়োজন: বসবাসের প্রমাণ, কৃষি কাজের প্রমাণ, সামাজিক সমর্থন।',
        cfr: 'সামাজিক বন সম্পদ অধিকার (CFR): বন সম্পদের সুরক্ষা, পরিচালনা ও ব্যবহারের জন্য সামাজিক অধিকার।',
        status: 'আপনার আবেদনের অবস্থা পরীক্ষা করতে: ১) আপনার আবেদন ID দিন ২) Status Checker ব্যবহার করুন।',
        documents: 'প্রয়োজনীয় কাগজপত্র: ১) আধার কার্ড ২) উপজাতি সার্টিফিকেট ৩) বসবাসের প্রমাণ ৪) জমির দখলের প্রমাণ।',
        default: 'আমি বন অধিকার আইন 2006 সম্পর্কিত সমস্ত তথ্যে সাহায্য করতে পারি। দয়া করে আপনার প্রশ্ন স্পষ্ট করুন।'
      }
    };

    const langResponses = responses[language];
    
    // Check for specific keywords
    if (input.includes('forest rights act') || input.includes('fra') || input.includes('वन अधिकार') || 
        input.includes('ବନ ଅଧିକାର') || input.includes('అటవీ హక్కుల') || input.includes('বন অধিকার')) {
      return langResponses.fra;
    }
    
    if (input.includes('individual forest rights') || input.includes('ifr') || input.includes('व्यक्तिगत') ||
        input.includes('ବ୍ୟକ୍ତିଗତ') || input.includes('వ్యక్తిగత') || input.includes('ব্যক্তিগত')) {
      return langResponses.ifr;
    }
    
    if (input.includes('community forest rights') || input.includes('cfr') || input.includes('सामुदायिक') ||
        input.includes('ସମ୍ପ୍ରଦାୟିକ') || input.includes('సమాజిక') || input.includes('সামাজিক')) {
      return langResponses.cfr;
    }
    
    if (input.includes('status') || input.includes('application') || input.includes('स्थिति') ||
        input.includes('ସ୍ଥିତି') || input.includes('స్థితి') || input.includes('অবস্থা')) {
      return langResponses.status;
    }
    
    if (input.includes('document') || input.includes('दस्तावेज़') || input.includes('ଦଲିଲ') ||
        input.includes('పత్రాలు') || input.includes('কাগজপত্র')) {
      return langResponses.documents;
    }
    
    return langResponses.default;
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    handleSendMessage();
  };

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    setMessages([{
      id: '1',
      type: 'bot',
      content: languageContent[language].welcome,
      timestamp: new Date()
    }]);
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
                  <span className="text-xs text-muted-foreground">{languageContent[currentLanguage].online}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-20 h-8 text-xs">
                  <Languages className="h-3 w-3 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="od">ଓଡ଼ିଆ</SelectItem>
                  <SelectItem value="te">తెలుగు</SelectItem>
                  <SelectItem value="bn">বাংলা</SelectItem>
                </SelectContent>
              </Select>
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
                <p className="text-xs text-muted-foreground mb-2">{languageContent[currentLanguage].quickHelp}</p>
                <div className="grid grid-cols-1 gap-1">
                  {languageContent[currentLanguage].quickActions.map((action, index) => (
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
                  placeholder={languageContent[currentLanguage].placeholder}
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
                    {languageContent[currentLanguage].callSupport}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Mail className="h-3 w-3 mr-1" />
                    {languageContent[currentLanguage].email}
                  </Button>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {languageContent[currentLanguage].support247}
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
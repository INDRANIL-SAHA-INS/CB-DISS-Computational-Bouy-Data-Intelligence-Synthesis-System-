'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  placeholder?: string;
  context?: string;
}

export default function ChatInterface({ 
  placeholder = "Ask me about the ocean...", 
  context = "general" 
}: ChatInterfaceProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getContextualResponse(inputValue, context),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const getContextualResponse = (input: string, context: string): string => {
    const responses = {
      general: "Globally, average sea surface temperatures have continued to rise, reaching historic highs in 2023. For detailed analysis, please visit the **Data Stories** section. To explore active floats in specific regions, click the **Explore Floats** link above.",
      explore: "I found 15 active floats in your selected region with oxygen sensors. Here is a table with their details below. Would you like to compare their latest oxygen profiles in **Data Stories**?",
      'data-stories': "This float has been collecting valuable oceanographic data since 2019. Its latest profile shows interesting temperature anomalies. You can download the complete dataset using the buttons above.",
    };
    
    return responses[context as keyof typeof responses] || responses.general;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 w-full max-w-md">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            className="mb-4 bg-gray-900/90 backdrop-blur-md rounded-lg border border-gray-700/50 shadow-2xl"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
              <h3 className="text-white font-medium">AI Assistant</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <p>Start a conversation about ocean data!</p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content.split('**').map((part, index) => 
                        index % 2 === 1 ? (
                          <strong key={index} className="text-blue-300">{part}</strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Bar */}
      <div className="bg-gray-900/90 backdrop-blur-md rounded-lg border border-gray-700/50 shadow-2xl">
        <div className="flex items-center p-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
            onFocus={() => !isExpanded && setIsExpanded(true)}
          />
          <div className="flex items-center space-x-2 ml-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="p-2 text-blue-400 hover:text-blue-300 disabled:text-gray-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
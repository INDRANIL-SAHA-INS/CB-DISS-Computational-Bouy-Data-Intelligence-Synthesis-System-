import React, { useEffect } from 'react';

// Define the Message interface
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Define the props for the ConversationArea component
interface ConversationAreaProps {
  messages: Message[];
  isLoading: boolean;
  isChatCollapsed: boolean;
  shouldShowChat: boolean;
  formatTime: (date: Date) => string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onClearChat: () => void;
}

// The component definition
const ConversationArea: React.FC<ConversationAreaProps> = ({
  messages,
  isLoading,
  isChatCollapsed,
  shouldShowChat,
  formatTime,
  messagesEndRef,
  onClearChat,
}) => {
  useEffect(() => {
    if (!isChatCollapsed && shouldShowChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatCollapsed, shouldShowChat, messagesEndRef]);

  if (!shouldShowChat) return null;

  return (
    <div className="flex flex-col w-full transition-all duration-500 animate-in slide-in-from-bottom-4">
      {/* Chat Header with Clear Button - Only show when not collapsed */}
      {!isChatCollapsed && (
  <div className="w-full bg-gradient-to-br from-cyan-800/60 to-cyan-400/40 backdrop-blur-sm rounded-t-xl border-t border-x border-cyan-700/50 px-4 py-3 flex items-center justify-between transition-all duration-500">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-white font-semibold">Ocean AI Assistant</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearChat}
              className="text-slate-400 hover:text-white px-3 py-1 rounded-lg hover:bg-slate-700/50 transition-colors text-sm"
              title="Clear chat"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Messages Area - Only show when not collapsed */}
      {!isChatCollapsed && (
  <div className="w-full bg-gradient-to-br from-cyan-800/60 to-cyan-400/40 backdrop-blur-sm border-x border-cyan-700/50 border-b rounded-b-xl overflow-hidden transition-all duration-500">
          <div className="h-[60vh] sm:h-[65vh] overflow-y-auto p-4 sm:p-6 space-y-4 transition-all duration-500">
            {messages.length === 0 ? (
              <div className="text-center text-slate-400 py-12">
                <div className="text-5xl sm:text-6xl mb-4">🌊</div>
                <p className="text-lg">Start a conversation about ocean data!</p>
                <p className="text-sm mt-2">Ask about Argo floats, temperature, salinity, or any ocean research topic.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 break-words overflow-wrap-anywhere ${
                      message.role === 'user'
                        ? 'bg-cyan-950/80 text-white border border-cyan-900/70'
                        : 'bg-cyan-950/80 text-white border border-cyan-900/70'
                    }`}
                    style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                  >
                    <div className="whitespace-pre-wrap font-medium break-words overflow-wrap-anywhere" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{message.content}</div>
                    <div
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-cyan-200'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-cyan-950/80 text-white rounded-lg px-4 py-3 max-w-[80%] border border-cyan-900/70 break-words overflow-wrap-anywhere" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-slate-200 font-medium">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  );
};

// The correct and only place for the default export
export default ConversationArea;
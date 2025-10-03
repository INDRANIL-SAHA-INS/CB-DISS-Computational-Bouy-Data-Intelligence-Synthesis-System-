"use client"

import React, { useState, useRef, useEffect } from 'react'
import { PromptBox } from '@/components/ui/prompt-input-clean'
import { ChevronDown, ChevronUp, MessageCircle, X } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const PromptBoxPage = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isChatCollapsed, setIsChatCollapsed] = useState(true) // Start collapsed
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const promptBoxRef = useRef<HTMLTextAreaElement>(null)

  // Check if chat should be visible (has messages or is loading)
  const shouldShowChat = messages.length > 0 || isLoading

  // Load persistent chat state from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat-messages')
    const savedCollapsedState = localStorage.getItem('chat-collapsed')
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(parsedMessages)
        // If we have messages, show the chat but respect collapsed state
        if (parsedMessages.length > 0 && savedCollapsedState) {
          setIsChatCollapsed(JSON.parse(savedCollapsedState))
        } else if (parsedMessages.length > 0) {
          setIsChatCollapsed(false) // Show chat if we have messages
        }
      } catch (error) {
        console.error('Error loading saved messages:', error)
      }
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat-messages', JSON.stringify(messages))
    }
  }, [messages])

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('chat-collapsed', JSON.stringify(isChatCollapsed))
  }, [isChatCollapsed])

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (!isChatCollapsed && shouldShowChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isChatCollapsed, shouldShowChat])

  const handleSubmit = async (inputText: string) => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date()
    }

    // Add user message to chat
    setMessages(prev => [...prev, userMessage])
    // Expand chat when first message is sent
    if (messages.length === 0) {
      setIsChatCollapsed(false)
    }
    setIsLoading(true)

    try {
      // Send request to your API
      const response = await fetch('/api/general-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage.content }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Add AI response to chat
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChatCollapse = () => {
    setIsChatCollapsed(!isChatCollapsed)
  }

  const clearChat = () => {
    setMessages([])
    setIsChatCollapsed(true) // Collapse chat when cleared
    localStorage.removeItem('chat-messages')
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-4xl font-bold text-white mb-4">
          Ocean Data Intelligence
        </h1>
        <p className="text-lg text-slate-300">
          Ask me anything about Argo floats and ocean data
        </p>
      </div>

      {/* Chat Container - Only show when there are messages or loading */}
      {shouldShowChat && (
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 mb-4 transition-all duration-500 animate-in slide-in-from-top-4" id="chat-container">
          {/* Chat Header with Clear Button - Only show when not collapsed */}
          {!isChatCollapsed && (
            <div className="bg-black/20 backdrop-blur-md rounded-t-xl border-t border-x border-slate-700/50 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-white font-semibold">Ocean AI Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
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
            <div className="flex-1 bg-black/20 backdrop-blur-md border-x border-slate-700/50 border-b rounded-b-xl overflow-hidden" id="chat-messages-area">
              <div className="h-96 overflow-y-auto p-6 space-y-4" id="chat-messages-container">
                {messages.length === 0 ? (
                  <div className="text-center text-slate-400 py-12">
                    <div className="text-6xl mb-4">🌊</div>
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
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-slate-700/90 text-white border border-slate-600/50'
                        }`}
                      >
                        <div className="whitespace-pre-wrap font-medium">{message.content}</div>
                        <div
                          className={`text-xs mt-2 ${
                            message.role === 'user' ? 'text-blue-100' : 'text-slate-300'
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
                    <div className="bg-slate-700/90 text-white rounded-lg px-4 py-3 max-w-[80%] border border-slate-600/50">
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
      )}

      {/* Input Area - Always visible, centered when no chat */}
      <div className={`${shouldShowChat ? 'max-w-4xl mx-auto w-full px-4' : 'max-w-2xl mx-auto w-full px-4'} transition-all duration-500`}>
        <div className="bg-black/20 backdrop-blur-md border border-slate-700/50 p-4 rounded-xl" id="chat-input-area">
          <PromptBox 
            ref={promptBoxRef}
            className="w-full [&_textarea]:text-white [&_textarea]:placeholder:text-slate-400"
            placeholder="Ask me about ocean temperature, salinity, Argo floats..."
            onSubmit={handleSubmit}
            disabled={isLoading}
            id="ocean-chat-input-box"
            showCollapseButton={shouldShowChat}
            isCollapsed={isChatCollapsed}
            onToggleCollapse={toggleChatCollapse}
          />
        </div>
      </div>

      {/* Map Background Area - Shows when chat is collapsed but has messages */}
      {shouldShowChat && isChatCollapsed && (
        <div className="max-w-4xl mx-auto w-full px-4 mt-4" id="map-background-area">
          <div className="bg-slate-800/20 backdrop-blur-sm rounded-xl p-8 text-center text-slate-300">
            <h2 className="text-2xl font-bold mb-4">Interactive Ocean Map</h2>
            <p className="mb-4">Your ocean map component will go here</p>
            <p className="text-sm text-slate-400">
              Expand the chat above to continue your conversation.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center py-6 px-4">
        <p className="text-sm text-slate-400">
          Powered by AI • Ocean Data Analysis • Real-time Insights
        </p>
      </div>
    </div>
  )
}

export default PromptBoxPage
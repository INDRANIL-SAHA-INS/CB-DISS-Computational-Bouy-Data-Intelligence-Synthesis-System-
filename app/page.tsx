'use client';

import Globe from '@/components/ui/globe';
import WaveEffect from '@/components/WaveEffect';
import { PromptBox } from '@/components/ui/prompt-input-clean';
import ChatHistory from '@/components/ChatHistory';
import Navigation from '@/components/Navigation';
import { useState, useRef, useEffect } from 'react';
import ConversationArea from '@/components/ConversationArea';

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isChatCollapsed, setIsChatCollapsed] = useState(true) // Start collapsed
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const promptBoxRef = useRef<HTMLTextAreaElement>(null)

  // Check if chat should be visible (has messages or is loading)
  const shouldShowChat = messages.length > 0 || isLoading

  const handleSidebarCollapse = (collapsed: boolean) => setSidebarCollapsed(collapsed);

  // Load persistent chat state from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('home-chat-messages')
    const savedCollapsedState = localStorage.getItem('home-chat-collapsed')
    
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
      localStorage.setItem('home-chat-messages', JSON.stringify(messages))
    }
  }, [messages])

  // Save collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('home-chat-collapsed', JSON.stringify(isChatCollapsed))
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
    localStorage.removeItem('home-chat-messages')
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
  <div className="min-h-screen text-[#E0F2F1] overflow-hidden relative bg-gradient-to-br from-[#181F2A] via-[#22304A] to-[#233554]">
      <Navigation isSidebarCollapsed={sidebarCollapsed} />
      <ChatHistory onCollapse={handleSidebarCollapse} />
      {/* Main content area */}
      <main
        className={`flex flex-col items-center relative z-10 h-[calc(100vh-64px)] mt-16 ${
          sidebarCollapsed ? '' : 'ml-[280px] w-[calc(100%-280px)]'
        }`}
        style={{
          background: 'linear-gradient(0deg, #1AC3D9 0%, #007B9A 18%, #014154 60%, #01212A 100%)'
        }}
      >
        <WaveEffect />
        {/* Heading and description above the globe */}
        <div className="flex flex-col items-center w-full max-w-3xl gap-2 mt-2">
            <h1
              className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg text-center py-2 font-[Montserrat] tracking-wide"
              style={{ wordSpacing: '0.2em', fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif" }}
            >
              Computational Buoy Data Intelligence Synthesis System
            </h1>
          <p className="text-base text-[#B0BEC5] leading-relaxed text-center px-4">
            Explore the world&apos;s ocean through autonomous profiling floats. 
            Discover temperature, salinity, and biogeochemical data from across the globe.
          </p>
        </div>
        
        {/* Globe container with controlled size */}
        <div className="flex justify-center items-center w-full flex-1" style={{ minHeight: '35vh', maxHeight: '45vh' }}>
          <div className="w-full max-w-xl">
            <Globe />
          </div>
        </div>
        
        {/* Option buttons just below the globe */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-2xl z-10 mb-20">
          <a
            href="/explore"
            className="bg-transparent hover:bg-[#1AC3D9] hover:bg-opacity-80 text-white px-5 py-2 rounded-md transition-all duration-300 font-medium shadow-md hover:shadow-[#1AC3D9]/30 border-2 border-[#1AC3D9]/40 text-base text-center"
          >
            Explore Floats
          </a>
          <a
            href="/data-stories"
            className="bg-transparent hover:bg-[#1AC3D9] hover:bg-opacity-80 text-white px-5 py-2 rounded-md transition-all duration-300 font-medium shadow-md hover:shadow-[#1AC3D9]/30 border-2 border-[#1AC3D9]/40 text-base text-center"
          >
            View Data Stories
          </a>
        </div>

        {/* ConversationArea with smooth transition */}
        <div
          className={`absolute bottom-20 left-0 w-full flex justify-center z-10 pointer-events-none transition-all duration-500 ${isChatCollapsed ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}`}
        >
          <div
            className={`w-full ${!isChatCollapsed ? 'max-w-4xl' : 'max-w-2xl'} pointer-events-auto px-4 transition-all duration-500`}
          >
            <ConversationArea
              messages={messages}
              isLoading={isLoading}
              isChatCollapsed={isChatCollapsed}
              shouldShowChat={shouldShowChat}
              formatTime={formatTime}
              messagesEndRef={messagesEndRef}
              onClearChat={clearChat}
            />
          </div>
        </div>

        {/* Prompt Box - Centered at the bottom of main section, width matches chat when expanded */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center z-20 pointer-events-none">
          <div
            className={`w-full ${!isChatCollapsed ? 'max-w-4xl' : 'max-w-2xl'} pointer-events-auto px-4 transition-all duration-500`}
          >
            <PromptBox 
              ref={promptBoxRef}
              placeholder="Ask me about the ocean..." 
              onSubmit={handleSubmit}
              disabled={isLoading}
              className={`w-full transition-all duration-500`}
              showCollapseButton={shouldShowChat}
              isCollapsed={isChatCollapsed}
              onToggleCollapse={toggleChatCollapse}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

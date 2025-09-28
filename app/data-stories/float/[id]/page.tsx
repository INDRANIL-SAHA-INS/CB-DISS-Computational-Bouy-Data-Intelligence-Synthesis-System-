'use client';

import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ChatInterface from '@/components/ChatInterface';
import { 
  LatestProfileCard, 
  TrajectoryCard, 
  TechnicalHealthCard, 
  MetadataCard 
} from '@/components/FloatDetailCard';

interface FloatDetailPageProps {
  params: {
    id: string;
  };
}

export default function FloatDetailPage({ params }: FloatDetailPageProps) {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
  <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button
              onClick={handleBackClick}
              className="flex items-center space-x-2 text-accent hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Data Stories</span>
            </button>
            
            <h1 className="text-3xl font-bold mb-2">
              Float {params.id} - Detailed Analysis
            </h1>
            <p className="text-muted-foreground">
              Comprehensive data and analysis for ARGO float {params.id}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
              <LatestProfileCard />
            </div>
            
            <TrajectoryCard />
            <TechnicalHealthCard />
            <MetadataCard />
          </div>
        </div>
      </main>
      
      <ChatInterface 
        placeholder="Ask about this float's data..." 
        context="data-stories" 
      />
    </div>
  );
}
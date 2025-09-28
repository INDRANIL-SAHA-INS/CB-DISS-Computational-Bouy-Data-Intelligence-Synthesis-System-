import { ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ChatInterface from '@/components/ChatInterface';
import { 
  LatestProfileCard, 
  TrajectoryCard, 
  TechnicalHealthCard, 
  MetadataCard 
} from '@/components/FloatDetailCard';
import Link from 'next/link';

export default async function FloatDetailPage(props: PageProps<"/data-stories/float/[id]">) {
  const params = await props.params;
  const id = params.id;

  return (
  <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link
              href="/data-stories"
              className="flex items-center space-x-2 text-accent hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Data Stories</span>
            </Link>
            
            <h1 className="text-3xl font-bold mb-2">
              Float {id} - Detailed Analysis
            </h1>
            <p className="text-muted-foreground">
              Comprehensive data and analysis for ARGO float {id}
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
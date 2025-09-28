'use client';

import Navigation from '@/components/Navigation';
import ChatInterface from '@/components/ChatInterface';
import StoryCard, { TemperatureThumbnail, MapThumbnail, ChartThumbnail } from '@/components/StoryCard';

const stories = [
  {
    id: '1',
    title: 'Indian Ocean Warming Trends (2010-2023)',
    description: 'Comprehensive analysis of temperature anomalies across the Indian Ocean basin using ARGO float data. This study reveals significant warming patterns and their correlation with global climate phenomena.',
    date: 'Jan 2024',
    category: 'Climate Analysis',
    thumbnail: <TemperatureThumbnail />,
  },
  {
    id: '2',
    title: 'El Niño\'s Impact on Argo Floats',
    description: 'Examining how El Niño Southern Oscillation events affect ocean temperature and salinity profiles as measured by autonomous floats across the Pacific.',
    date: 'Dec 2023',
    category: 'Climate Patterns',
    thumbnail: <MapThumbnail />,
  },
  {
    id: '3',
    title: 'BGC Data: Oxygen Depletion in Arabian Sea',
    description: 'Biogeochemical analysis revealing concerning trends in dissolved oxygen levels in the Arabian Sea, with implications for marine ecosystems and fisheries.',
    date: 'Nov 2023',
    category: 'Biogeochemistry',
    thumbnail: <ChartThumbnail />,
  },
  {
    id: '4',
    title: 'Deep Water Formation in Southern Ocean',
    description: 'Investigation of Antarctic Bottom Water formation using deep ARGO float profiles, revealing changes in global thermohaline circulation.',
    date: 'Oct 2023',
    category: 'Physical Oceanography',
    thumbnail: <TemperatureThumbnail />,
  },
  {
    id: '5',
    title: 'Seasonal Variability in Tropical Pacific',
    description: 'Multi-year analysis of seasonal temperature and salinity cycles in the tropical Pacific, highlighting the role of trade winds and upwelling.',
    date: 'Sep 2023',
    category: 'Seasonal Analysis',
    thumbnail: <ChartThumbnail />,
  },
  {
    id: '6',
    title: 'Marine Heatwaves: A Global Perspective',
    description: 'Using ARGO data to track and analyze marine heatwave events worldwide, their duration, intensity, and ecological impacts.',
    date: 'Aug 2023',
    category: 'Extreme Events',
    thumbnail: <TemperatureThumbnail />,
  },
];

export default function DataStoriesPage() {
  const handleStoryClick = (storyId: string) => {
    // Navigate to story details
    window.location.href = `/data-stories/${storyId}`;
  };

  return (
  <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Data Stories & Analysis
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover insights from ocean data through curated analyses and visualizations. 
              Each story reveals patterns and trends in our changing oceans.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                title={story.title}
                description={story.description}
                date={story.date}
                category={story.category}
                thumbnail={story.thumbnail}
                onClick={() => handleStoryClick(story.id)}
              />
            ))}
          </div>
        </div>
      </main>
      
      <ChatInterface 
        placeholder="Ask about a data story..." 
        context="data-stories" 
      />
    </div>
  );
}
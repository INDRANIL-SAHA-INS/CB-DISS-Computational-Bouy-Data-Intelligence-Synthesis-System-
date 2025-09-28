'use client';

import { ArrowRight, Calendar, TrendingUp, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface StoryCardProps {
  title: string;
  description: string;
  date: string;
  category: string;
  thumbnail: React.ReactNode;
  onClick?: () => void;
}

export default function StoryCard({ 
  title, 
  description, 
  date, 
  category, 
  thumbnail, 
  onClick 
}: StoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gray-900/90 backdrop-blur-md rounded-lg border border-gray-700/50 overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <div className="aspect-video bg-gray-800 flex items-center justify-center border-b border-gray-700/50">
        {thumbnail}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs rounded-full">
            {category}
          </span>
          <div className="flex items-center text-gray-400 text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {date}
          </div>
        </div>
        
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
            <span className="text-sm font-medium">Read More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Thumbnail components for different story types
export function TemperatureThumbnail() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-20 relative">
        <svg viewBox="0 0 128 80" className="w-full h-full">
          <defs>
            <linearGradient id="tempGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          <path
            d="M 10 60 Q 30 40 50 45 T 90 35 T 118 30"
            stroke="url(#tempGradient)"
            strokeWidth="3"
            fill="none"
          />
          <circle cx="118" cy="30" r="3" fill="#eab308" />
        </svg>
      </div>
    </div>
  );
}

export function MapThumbnail() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <MapPin className="w-12 h-12 text-blue-400" />
    </div>
  );
}

export function ChartThumbnail() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <TrendingUp className="w-12 h-12 text-green-400" />
    </div>
  );
}
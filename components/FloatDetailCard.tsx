'use client';

import { Download, Battery, MapPin, Activity, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FloatDetailCardProps {
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
  className?: string;
}

export function DetailCard({ title, icon, children, className = '' }: FloatDetailCardProps) {
  return (
    <div className={`bg-[#181F2A] border border-[#2A3652] rounded-lg p-6 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        {icon}
        <h3 className="text-[#4FC3F7] font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// Sample data for charts
const temperatureData = [
  { depth: 0, temp: 28.5 },
  { depth: 50, temp: 26.2 },
  { depth: 100, temp: 22.8 },
  { depth: 200, temp: 18.5 },
  { depth: 500, temp: 12.3 },
  { depth: 1000, temp: 8.7 },
  { depth: 1500, temp: 5.2 },
  { depth: 2000, temp: 3.1 },
];

export function LatestProfileCard() {
  return (
    <DetailCard
      title="Float 2902214 - Latest Profile"
        icon={<Activity className="w-5 h-5 text-accent" />}
      className="col-span-2"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-[#B0BEC5] font-medium mb-3">Temperature vs Depth</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#22304A" />
                <XAxis 
                  dataKey="temp" 
                  stroke="#4FC3F7"
                  label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -5, fill: '#4FC3F7' }}
                />
                <YAxis 
                  dataKey="depth"
                  reversed
                  stroke="#4FC3F7"
                  label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft', fill: '#4FC3F7' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#181F2A', 
                    border: '1px solid #2A3652',
                    borderRadius: '8px',
                    color: '#4FC3F7'
                  }}
                  labelStyle={{ color: '#4FC3F7' }}
                  itemStyle={{ color: '#4FC3F7' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="depth" 
                  stroke="#4FC3F7" 
                  strokeWidth={2}
                  dot={{ fill: '#4FC3F7', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h4 className="text-[#B0BEC5] font-medium mb-3">Key Values</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
                <span className="text-[#B0BEC5]">Surface Temperature:</span>
                <span className="text-[#4FC3F7]">28.5°C</span>
            </div>
            <div className="flex justify-between">
                <span className="text-[#B0BEC5]">Surface Salinity:</span>
                <span className="text-[#4FC3F7]">35.2 PSU</span>
            </div>
            <div className="flex justify-between">
                <span className="text-[#B0BEC5]">Dissolved Oxygen:</span>
                <span className="text-[#4FC3F7]">4.8 ml/L</span>
            </div>
            <div className="flex justify-between">
                <span className="text-[#B0BEC5]">Max Depth:</span>
                <span className="text-[#4FC3F7]">2000 m</span>
            </div>
            <div className="flex justify-between">
                <span className="text-[#B0BEC5]">Profile Date:</span>
                <span className="text-[#4FC3F7]">2024-01-15</span>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <button className="w-full bg-[#22304A] hover:bg-[#2A3652] text-[#4FC3F7] py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download NetCDF</span>
            </button>
            <button className="w-full bg-[#151A24] hover:bg-[#22304A] text-[#B0BEC5] py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </div>
    </DetailCard>
  );
}

export function TrajectoryCard() {
  return (
    <DetailCard
      title="Trajectory Map"
      icon={<MapPin className="w-5 h-5 text-green-400" />}
    >
      <div className="h-48 bg-[#22304A] rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-[#4FC3F7] mx-auto mb-2" />
          <p className="text-[#B0BEC5] text-sm">Interactive trajectory map</p>
          <p className="text-[#B0BEC5] text-xs">Showing 156 profiles over 3.2 years</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-[#B0BEC5]">Deployment:</span>
          <p className="text-[#4FC3F7]">10.5°S, 65.2°E</p>
        </div>
        <div>
          <span className="text-[#B0BEC5]">Current:</span>
          <p className="text-[#4FC3F7]">12.1°S, 67.8°E</p>
        </div>
      </div>
    </DetailCard>
  );
}

export function TechnicalHealthCard() {
  return (
    <DetailCard
      title="Technical Health"
      icon={<Battery className="w-5 h-5 text-yellow-400" />}
    >
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-[#B0BEC5] text-sm">Battery Voltage</span>
            <span className="text-[#4FC3F7] text-sm">12.8V</span>
          </div>
          <div className="w-full bg-[#151A24] rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-[#B0BEC5] text-sm">Transmission Success</span>
            <span className="text-[#4FC3F7] text-sm">98%</span>
          </div>
          <div className="w-full bg-[#151A24] rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98%' }}></div>
          </div>
        </div>
        <div className="pt-2 border-t border-[#2A3652]">
          <div className="flex justify-between text-sm">
            <span className="text-[#B0BEC5]">Last Transmission:</span>
            <span className="text-[#4FC3F7]">2 hours ago</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-[#B0BEC5]">Cycle Number:</span>
            <span className="text-[#4FC3F7]">156</span>
          </div>
        </div>
      </div>
    </DetailCard>
  );
}

export function MetadataCard() {
  return (
    <DetailCard
      title="All Metadata"
      icon={<Calendar className="w-5 h-5 text-purple-400" />}
    >
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[#B0BEC5]">WMO ID:</span>
          <span className="text-[#4FC3F7]">2902214</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#B0BEC5]">Platform Type:</span>
          <span className="text-[#4FC3F7]">APEX</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#B0BEC5]">Deployment Date:</span>
          <span className="text-[#4FC3F7]">2020-11-15</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#B0BEC5]">Country:</span>
          <span className="text-[#4FC3F7]">India</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#B0BEC5]">Institution:</span>
          <span className="text-[#4FC3F7]">INCOIS</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#B0BEC5]">PI Name:</span>
          <span className="text-[#4FC3F7]">Dr. M. Ravichandran</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#B0BEC5]">Cycle Time:</span>
          <span className="text-[#4FC3F7]">10 days</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#B0BEC5]">Parking Depth:</span>
          <span className="text-[#4FC3F7]">1000 m</span>
        </div>
      </div>
    </DetailCard>
  );
}
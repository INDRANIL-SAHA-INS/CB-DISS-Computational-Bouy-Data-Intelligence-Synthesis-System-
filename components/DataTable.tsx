'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, ExternalLink, Download } from 'lucide-react';

// Import the FloatDetailCard components
import { LatestProfileCard, TrajectoryCard, TechnicalHealthCard, MetadataCard } from './FloatDetailCard';

interface FloatData {
  id: string;
  lastProfile: string;
  lat: number;
  lon: number;
  status: 'active' | 'inactive';
  country: string;
  variables: string[];
}

const mockData: FloatData[] = [
  { id: '2902214', lastProfile: '2024-01-15', lat: -10.5, lon: 65.2, status: 'active', country: 'India', variables: ['TEMP', 'PSAL', 'DOXY'] },
  { id: '2902215', lastProfile: '2024-01-14', lat: -8.3, lon: 67.8, status: 'active', country: 'India', variables: ['TEMP', 'PSAL'] },
  { id: '2902216', lastProfile: '2023-12-20', lat: -12.1, lon: 63.5, status: 'inactive', country: 'USA', variables: ['TEMP', 'PSAL', 'DOXY'] },
  { id: '2902217', lastProfile: '2024-01-16', lat: -15.7, lon: 69.2, status: 'active', country: 'France', variables: ['TEMP', 'PSAL', 'CHLA'] },
  { id: '2902218', lastProfile: '2024-01-15', lat: -6.8, lon: 71.4, status: 'active', country: 'India', variables: ['TEMP', 'PSAL', 'DOXY', 'CHLA'] },
];

interface DataTableProps {
  onRowClick?: (floatId: string) => void;
  onBackFromDetail?: () => void;
  showDetailForId?: string | null;
}

export function DataTable({ onRowClick, onBackFromDetail, showDetailForId }: DataTableProps) {
  const [sortField, setSortField] = useState<keyof FloatData>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [data, setData] = useState(mockData);

  // If showDetailForId is provided, use that to determine selected float
  const selectedFloat = showDetailForId ? data.find(f => f.id === showDetailForId) || null : null;

  const handleSort = (field: keyof FloatData) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);

    const sortedData = [...data].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
    setData(sortedData);
  };

  const SortIcon = ({ field }: { field: keyof FloatData }) => {
    if (sortField !== field) return <ChevronUp className="w-4 h-4 text-accent" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-accent" /> : 
      <ChevronDown className="w-4 h-4 text-accent" />;
  };

  return (
    <div className="bg-[#181F2A] border border-[#2A3652] text-white font-sans shadow-xl p-0">
      <div className="p-5 border-b border-[#2A3652] flex items-center justify-between bg-[#202B40]">
        {selectedFloat ? (
          <>
            <button
              className="text-[#4FC3F7] font-bold px-3 py-1 border border-[#4FC3F7] rounded hover:bg-[#22304A] transition-colors mr-4"
              onClick={typeof onBackFromDetail === 'function' ? onBackFromDetail : undefined}
            >
              &larr; Back
            </button>
            <h3 className="text-[#4FC3F7] font-semibold text-lg tracking-wide flex-1">Float Details</h3>
          </>
        ) : (
          <>
            <h3 className="text-[#4FC3F7] font-semibold text-lg tracking-wide">Selected Floats</h3>
            <button className="flex items-center space-x-2 bg-[#22304A] hover:bg-[#2A3652] text-[#B0BEC5] px-4 py-2 rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span>View Details in Data Stories</span>
            </button>
          </>
        )}
      </div>
      <div className="overflow-x-auto">
        {selectedFloat ? (
          <div className="p-6 space-y-6">
            {/* Show all the detail cards for the selected float */}
            <LatestProfileCard />
            <TrajectoryCard />
            <TechnicalHealthCard />
            <MetadataCard />
          </div>
        ) : (
          <table className="w-full text-sm text-left border border-[#2A3652]">
            <thead className="bg-[#151A24] border-b border-[#2A3652]">
              <tr>
                <th className="p-3 font-bold text-white tracking-wide">
                  <button
                    onClick={() => handleSort('id')}
                    className="flex items-center space-x-1 text-[#B0BEC5] hover:text-[#4FC3F7] transition-colors font-bold"
                  >
                    <span>Float ID</span>
                    <SortIcon field="id" />
                  </button>
                </th>
                <th className="p-3 font-bold text-white tracking-wide">
                  <button
                    onClick={() => handleSort('lastProfile')}
                    className="flex items-center space-x-1 text-[#B0BEC5] hover:text-white transition-colors font-semibold"
                  >
                    <span>Last Profile Date</span>
                    <SortIcon field="lastProfile" />
                  </button>
                </th>
                <th className="p-3 font-bold text-white tracking-wide">
                  <button
                    onClick={() => handleSort('lat')}
                    className="flex items-center space-x-1 text-[#B0BEC5] hover:text-white transition-colors font-semibold"
                  >
                    <span>Lat</span>
                    <SortIcon field="lat" />
                  </button>
                </th>
                <th className="p-3 font-bold text-white tracking-wide">
                  <button
                    onClick={() => handleSort('lon')}
                    className="flex items-center space-x-1 text-[#B0BEC5] hover:text-white transition-colors font-semibold"
                  >
                    <span>Lon</span>
                    <SortIcon field="lon" />
                  </button>
                </th>
                <th className="p-3 font-bold text-white tracking-wide">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-1 text-[#B0BEC5] hover:text-white transition-colors font-semibold"
                  >
                    <span>Status</span>
                    <SortIcon field="status" />
                  </button>
                </th>
                <th className="p-3 font-bold text-white tracking-wide">
                  <span className="text-[#B0BEC5] font-semibold">Variables</span>
                </th>
                <th className="p-3 font-bold text-[#B0BEC5] tracking-wide">
                  <span className="text-[#B0BEC5] font-semibold">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((float, idx) => (
                <tr
                  key={float.id}
                  onClick={() => {
                    if (onRowClick) onRowClick(float.id);
                  }}
                  className={`cursor-pointer transition-colors min-h-[48px] bg-[#181F2A] hover:bg-[#22304A] border-b border-[#2A3652]`}
                >
                  <td className="p-3 text-white font-mono border-r border-[#2A3652] align-middle">{float.id}</td>
                  <td className="p-3 text-white border-r border-[#2A3652] align-middle">{float.lastProfile}</td>
                  <td className="p-3 text-white border-r border-[#2A3652] align-middle">{float.lat.toFixed(1)}°</td>
                  <td className="p-3 text-white border-r border-[#2A3652] align-middle">{float.lon.toFixed(1)}°</td>
                  <td className="p-3 border-r border-[#2A3652] align-middle">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      float.status === 'active' 
                        ? 'bg-[#00B4D8]/20 text-[#00B4D8]' 
                        : 'bg-[#22304A] text-white'
                    }`}>
                      {float.status}
                    </span>
                  </td>
                  <td className="p-3 border-r border-[#2A3652] align-middle">
                    <div className="flex flex-wrap gap-1">
                      {float.variables.map((variable) => (
                        <span
                          key={variable}
                          className="px-2 py-1 bg-[#00B4D8]/10 text-white text-xs rounded"
                        >
                          {variable}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 align-middle">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle download
                      }}
                      className="p-1 text-white hover:text-[#00B4D8] transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
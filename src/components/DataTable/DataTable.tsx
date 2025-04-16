
import React, { useState } from 'react';
import { Location } from '@/services/locationService';
import { LocationCell } from './LocationCell';
import { MetricCell } from './MetricCell';
import { ReportCell } from './ReportCell';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface DataTableProps {
  locations: Location[];
}

const DataTable: React.FC<DataTableProps> = ({ locations }) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    locations.reduce((acc, location) => ({
      ...acc,
      [location.id]: location.isFavorite
    }), {})
  );
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    toast({
      title: favorites[id] ? 'Removed from favorites' : 'Added to favorites',
      description: `Location has been ${favorites[id] ? 'removed from' : 'added to'} your favorites.`,
      duration: 3000,
    });
  };

  const handleRowClick = (id: string) => {
    // Navigate to location detail page
    navigate(`/locations/${id}`);
  };

  return (
    <div className="w-full overflow-auto rounded-md border border-table-border bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-table-header text-sm font-medium text-gray-600">
          <tr>
            <th className="w-8 px-4 py-3 text-left"></th>
            <th className="w-8 px-4 py-3 text-left"></th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-center">Visitors</th>
            <th className="px-4 py-3 text-center">Revenue</th>
            <th className="px-4 py-3 text-center">Engagement</th>
            <th className="px-4 py-3 text-center">Satisfaction</th>
            <th className="px-4 py-3 text-center">Report</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <React.Fragment key={location.id}>
              <tr 
                className={cn(
                  "border-b border-table-border cursor-pointer transition-colors",
                  selectedRows[location.id] ? "bg-table-rowSelected" : "bg-table-row hover:bg-table-rowHover"
                )}
                onClick={() => handleRowClick(location.id)}
              >
                <td className="px-4 py-3" onClick={(e) => toggleSelect(location.id, e)}>
                  <div className="flex items-center justify-center h-5 w-5">
                    <input
                      type="checkbox"
                      checked={!!selectedRows[location.id]}
                      onChange={() => {}}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                </td>
                <td className="px-4 py-3" onClick={(e) => toggleFavorite(location.id, e)}>
                  <Star
                    className={cn(
                      "h-5 w-5 transition-colors", 
                      favorites[location.id] 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-gray-300 hover:text-gray-400"
                    )}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <LocationCell
                      name={location.name}
                      address={location.address}
                      expanded={!!expandedRows[location.id]}
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(location.id);
                      }}
                      className="ml-2 p-1 rounded-full hover:bg-gray-100"
                    >
                      {expandedRows[location.id] ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <MetricCell
                    value={location.metrics.visitors.count.toLocaleString()}
                    trend={location.metrics.visitors.trend}
                    percentage={location.metrics.visitors.percentage}
                  />
                </td>
                <td className="px-4 py-3">
                  <MetricCell
                    value={`$${location.metrics.revenue.amount.toLocaleString()}`}
                    trend={location.metrics.revenue.trend}
                    percentage={location.metrics.revenue.percentage}
                  />
                </td>
                <td className="px-4 py-3">
                  <MetricCell
                    value={location.metrics.engagement.score.toFixed(1)}
                    trend={location.metrics.engagement.trend}
                    percentage={location.metrics.engagement.percentage}
                  />
                </td>
                <td className="px-4 py-3">
                  <MetricCell
                    value={location.metrics.satisfaction.score.toFixed(1)}
                    trend={location.metrics.satisfaction.trend}
                    percentage={location.metrics.satisfaction.percentage}
                  />
                </td>
                <td className="px-4 py-3">
                  <ReportCell status={location.reportStatus} id={location.id} />
                </td>
              </tr>
              {expandedRows[location.id] && (
                <tr className="bg-gray-50 animate-fade-in">
                  <td colSpan={8} className="px-4 py-3">
                    <div className="pl-16 pr-4 py-2 text-sm text-gray-600">
                      <h4 className="font-medium mb-1">Additional Information:</h4>
                      <p>{location.detailedInfo}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

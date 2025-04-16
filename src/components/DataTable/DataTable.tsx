
import React, { useState } from 'react';
import { Location } from '@/services/locationService';
import { LocationCell } from './LocationCell';
import { MetricCell } from './MetricCell';
import { ReportCell } from './ReportCell';
import { Star, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface DataTableProps {
  locations: Location[];
}

const DataTable: React.FC<DataTableProps> = ({ locations }) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    locations.reduce((acc, location) => ({
      ...acc,
      [location.id]: location.isFavorite
    }), {})
  );
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;
  
  const { toast } = useToast();
  const navigate = useNavigate();

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

  // Pagination logic
  const totalPages = Math.ceil(locations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedLocations = locations.slice(startIndex, endIndex);

  // Selected count for floating action bar
  const selectedCount = Object.values(selectedRows).filter(Boolean).length;
  const selectedIndicator = `${startIndex + 1}-${Math.min(endIndex, locations.length)} of ${locations.length}`;

  const renderPagination = () => (
    <div className="flex items-center justify-end gap-2">
      <span className="text-sm text-gray-500">{selectedIndicator}</span>
      <div className="flex items-center">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          className="pagination-item"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <button className="pagination-item active">
          {currentPage}
        </button>
        
        <button 
          className="pagination-item"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        >
          {currentPage + 1}
        </button>
        
        <span className="pagination-item">...</span>
        
        <button 
          className="pagination-item"
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
        
        <button 
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          className="pagination-item"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full relative">
      {/* Header with pagination */}
      <div className="flex justify-between items-center p-4 mb-4">
        <div></div>
        {renderPagination()}
      </div>
      
      {/* Floating Action Bar */}
      {selectedCount > 0 && (
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-white p-2 shadow-sm border-b transition-all">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-700 ml-10">
              {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
            </div>
          </div>
        </div>
      )}
      
      <table className="brightlocal-table">
        <thead>
          <tr>
            <th className="w-12">
              <input
                type="checkbox"
                onChange={() => {
                  const allSelected = Object.keys(selectedRows).length === locations.length;
                  if (allSelected) {
                    setSelectedRows({});
                  } else {
                    const newSelected: Record<string, boolean> = {};
                    locations.forEach(location => {
                      newSelected[location.id] = true;
                    });
                    setSelectedRows(newSelected);
                  }
                }}
                className="h-4 w-4 rounded border-gray-300"
              />
            </th>
            <th className="w-12"></th>
            <th className="min-w-[200px]">
              <div className="flex items-center gap-2">
                <span>Location</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </th>
            <th className="text-center">Rankings up</th>
            <th className="text-center">Rankings down</th>
            <th className="text-center">Header name</th>
            <th className="text-center">Header name</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLocations.map((location) => (
            <tr 
              key={location.id}
              className="cursor-pointer"
              onClick={() => handleRowClick(location.id)}
            >
              <td className="w-12" onClick={(e) => toggleSelect(location.id, e)}>
                <div className="flex items-center justify-center h-5 w-5">
                  <input
                    type="checkbox"
                    checked={!!selectedRows[location.id]}
                    onChange={() => {}}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </div>
              </td>
              <td className="w-12" onClick={(e) => toggleFavorite(location.id, e)}>
                <Star
                  className={cn(
                    "h-5 w-5 transition-colors", 
                    favorites[location.id] 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300 hover:text-gray-400"
                  )}
                />
              </td>
              <td>
                <LocationCell
                  name={location.name}
                  address={location.address}
                  expanded={false}
                />
              </td>
              <td className="text-center">
                <ReportCell status="none" id={location.id} />
              </td>
              <td className="text-center">
                <ReportCell status="none" id={location.id} />
              </td>
              <td className="text-center">
                <ReportCell status="none" id={location.id} />
              </td>
              <td className="text-center">
                <ReportCell status="none" id={location.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

import React, { useState } from 'react';
import { Location } from '@/services/locationService';
import { LocationCell } from './LocationCell';
import { MetricCell } from './MetricCell';
import { ReportCell } from './ReportCell';
import { Star, ChevronDown, ChevronUp, Trash, Edit, Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious, 
  PaginationEllipsis 
} from '@/components/ui/pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20; // Change from 5 to 20
  
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

  // Pagination logic
  const totalPages = Math.ceil(locations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedLocations = locations.slice(startIndex, endIndex);

  // Action handlers for the floating action bar
  const handleBulkDelete = () => {
    const selectedCount = Object.values(selectedRows).filter(Boolean).length;
    toast({
      title: `${selectedCount} locations deleted`,
      description: 'The selected locations have been removed.',
      duration: 3000,
    });
    // Reset selected rows
    setSelectedRows({});
  };

  const handleBulkFavorite = () => {
    const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
    const updatedFavorites = { ...favorites };
    
    selectedIds.forEach(id => {
      updatedFavorites[id] = true;
    });
    
    setFavorites(updatedFavorites);
    
    toast({
      title: `${selectedIds.length} locations favorited`,
      description: 'The selected locations have been added to your favorites.',
      duration: 3000,
    });
  };

  // Selected count for floating action bar
  const selectedCount = Object.values(selectedRows).filter(Boolean).length;

  const renderPagination = () => (
    <Pagination className="my-4 flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          // Show first page, current page, last page, and pages around current page
          if (
            pageNum === 1 || 
            pageNum === totalPages || 
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink 
                  isActive={currentPage === pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (
            (pageNum === 2 && currentPage > 3) || 
            (pageNum === totalPages - 1 && currentPage < totalPages - 2)
          ) {
            return (
              <PaginationItem key={`ellipsis-${pageNum}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return null;
        })}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  return (
    <div className="w-full overflow-auto rounded-md border border-table-border bg-white shadow-sm relative">
      {/* Pagination - Top */}
      {renderPagination()}
      
      {/* Floating Action Bar */}
      {selectedCount > 0 && (
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-slate-50 p-2 shadow-sm border-b border-slate-200 transition-all">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-slate-700 mr-4">
              {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
            </div>
            <button 
              onClick={handleBulkDelete}
              className="rounded-full p-2 hover:bg-slate-200 transition-colors"
              aria-label="Delete selected"
            >
              <Trash className="h-5 w-5 text-slate-700" />
            </button>
            <button 
              onClick={handleBulkFavorite}
              className="rounded-full p-2 hover:bg-slate-200 transition-colors"
              aria-label="Star selected"
            >
              <Star className="h-5 w-5 text-slate-700" />
            </button>
            <button 
              className="rounded-full p-2 hover:bg-slate-200 transition-colors"
              aria-label="Edit selected"
            >
              <Edit className="h-5 w-5 text-slate-700" />
            </button>
            <button 
              className="rounded-full p-2 hover:bg-slate-200 transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5 text-slate-700" />
            </button>
          </div>
        </div>
      )}
      
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
          {paginatedLocations.map((location) => (
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
      
      {/* Pagination - Bottom */}
      {renderPagination()}
    </div>
  );
};

export default DataTable;

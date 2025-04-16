
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { FileText, Clock } from 'lucide-react';

interface ReportCellProps {
  status: 'available' | 'pending' | 'none';
  id: string;
}

export const ReportCell: React.FC<ReportCellProps> = ({ status, id }) => {
  const { toast } = useToast();

  const handleCreateReport = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Report requested",
      description: "Your report is being generated and will be available soon.",
      duration: 3000,
    });
  };

  const handleViewReport = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`/reports/${id}`, '_blank');
  };

  if (status === 'available') {
    return (
      <Button
        variant="outline"
        size="sm"
        className="text-xs px-2 py-1 h-auto bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
        onClick={handleViewReport}
      >
        <FileText className="h-3 w-3 mr-1" />
        View Report
      </Button>
    );
  }

  if (status === 'pending') {
    return (
      <div className="flex items-center justify-center text-xs text-amber-600">
        <Clock className="h-3 w-3 mr-1" />
        Processing
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-xs px-2 py-1 h-auto hover:bg-gray-50 text-gray-500 hover:text-gray-700"
      onClick={handleCreateReport}
    >
      Create Report
    </Button>
  );
};

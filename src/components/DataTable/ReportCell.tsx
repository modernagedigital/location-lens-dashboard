
import React from 'react';
import { useToast } from '@/components/ui/use-toast';

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

  return (
    <button
      onClick={handleCreateReport}
      className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded"
    >
      Create report
    </button>
  );
};

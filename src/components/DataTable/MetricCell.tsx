
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCellProps {
  value: string;
  trend: 'up' | 'down';
  percentage: number;
}

export const MetricCell: React.FC<MetricCellProps> = ({
  value,
  trend,
  percentage,
}) => {
  return (
    <div className="flex flex-col items-center">
      <span className="font-medium text-gray-900">{value}</span>
      <div className="flex items-center gap-1 text-xs">
        {trend === 'up' ? (
          <ArrowUp className="h-3 w-3 text-trend-up" />
        ) : (
          <ArrowDown className="h-3 w-3 text-trend-down" />
        )}
        <span
          className={cn(
            trend === 'up' ? 'text-trend-up' : 'text-trend-down'
          )}
        >
          {percentage}%
        </span>
      </div>
    </div>
  );
};

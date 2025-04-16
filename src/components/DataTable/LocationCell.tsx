
import React from 'react';

interface LocationCellProps {
  name: string;
  address: string;
  expanded: boolean;
}

export const LocationCell: React.FC<LocationCellProps> = ({
  name,
  address,
  expanded,
}) => {
  return (
    <div className="flex flex-col text-left">
      <span className="font-medium text-gray-900">{name}</span>
      <span className="text-xs text-gray-500">{address}</span>
    </div>
  );
};

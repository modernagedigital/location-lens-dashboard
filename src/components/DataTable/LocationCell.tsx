
import React from 'react';

interface LocationCellProps {
  name: string;
  address: string;
}

export const LocationCell: React.FC<LocationCellProps> = ({
  name,
  address,
}) => {
  return (
    <div className="flex flex-col text-left min-w-[180px]">
      <div className="flex items-center">
        <span className="font-medium text-gray-900 truncate">{name}</span>
      </div>
      <span className="text-xs text-gray-500 truncate">{address}</span>
    </div>
  );
};

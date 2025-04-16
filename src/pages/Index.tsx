
import React, { useState } from 'react';
import DataTable from '@/components/DataTable/DataTable';
import { fetchLocations } from '@/services/locationService';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Download, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Index = () => {
  const locations = fetchLocations();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter(
    location => location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Location Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and analyze all your business locations</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Location
        </Button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
        <DataTable locations={filteredLocations} />
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        Showing {filteredLocations.length} of {locations.length} locations
      </div>
    </div>
  );
};

export default Index;

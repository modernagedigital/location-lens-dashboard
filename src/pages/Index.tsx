
import React, { useState } from 'react';
import DataTable from '@/components/DataTable/DataTable';
import { fetchLocations } from '@/services/locationService';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Plus, Settings, Home, Users, ShoppingCart, MessageSquare, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Index = () => {
  const locations = fetchLocations();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter(
    location => location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#f7f8fa]">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <svg className="h-8 w-8 text-primary mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
            </svg>
            <span className="font-semibold text-primary text-lg">brightlocal</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="text-sm font-medium mb-2 text-gray-400">Trial tasks</div>
          <a href="#" className="sidebar-item active">
            <Home className="h-5 w-5" />
            <span>All Locations</span>
          </a>
        </div>
        
        <div className="p-4">
          <a href="#" className="sidebar-item">
            <Users className="h-5 w-5" />
            <span>Clients</span>
          </a>
          <a href="#" className="sidebar-item">
            <ShoppingCart className="h-5 w-5" />
            <span>Leads</span>
          </a>
        </div>
        
        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <HelpCircle className="h-5 w-5 text-gray-500" />
            </button>
            <div className="flex items-center gap-1">
              <div className="w-6 h-4 bg-blue-500"></div>
              <div className="w-6 h-4 bg-yellow-400"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">All Locations</h1>
          <div className="flex gap-4">
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Search className="h-5 w-5" />
              </button>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2 rounded-full">
              <Plus className="h-4 w-4" />
              Add Location
            </Button>
          </div>
        </div>
        
        {/* Search and filter */}
        <div className="mb-6 flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10 rounded-md border-gray-200"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-1 border-gray-200 bg-white text-gray-700">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden md:inline">Filter</span>
          </Button>
          <Button variant="outline" className="gap-1 border-gray-200 bg-white text-gray-700">
            <span className="hidden md:inline">Custom view</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </Button>
        </div>
        
        {/* Data table */}
        <div className="bg-white rounded-md shadow-sm border border-gray-200">
          <DataTable locations={filteredLocations} />
        </div>
      </div>
    </div>
  );
};

export default Index;

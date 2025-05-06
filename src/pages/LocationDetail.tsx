
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchLocations } from '@/services/locationService';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Users, DollarSign, BarChart2, Heart } from 'lucide-react';

const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const locations = fetchLocations();
  const location = locations.find(loc => loc.id === id);
  
  if (!location) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h2 className="text-2xl font-bold mb-4">Location not found</h2>
        <Button variant="outline" onClick={() => navigate('/')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container py-10 max-w-5xl">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 text-gray-600"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Locations
      </Button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{location.name}</h1>
            <Button variant="outline" className="gap-2">
              <Heart className="h-4 w-4" />
              {location.isFavorite ? 'Favorited' : 'Add to Favorites'}
            </Button>
          </div>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location.address}</span>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Location Details</h2>
          <p className="text-gray-700 mb-8">{location.detailedInfo}</p>
          
          <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">Visitors</span>
              </div>
              <div className="text-2xl font-bold">{location.metrics.visitors.count.toLocaleString()}</div>
              <div className={`text-sm ${location.metrics.visitors.trend === 'up' ? 'text-trend-up' : 'text-trend-down'}`}>
                {location.metrics.visitors.trend === 'up' ? '↑' : '↓'} {location.metrics.visitors.percentage}%
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">Revenue</span>
              </div>
              <div className="text-2xl font-bold">${location.metrics.revenue.amount.toLocaleString()}</div>
              <div className={`text-sm ${location.metrics.revenue.trend === 'up' ? 'text-trend-up' : 'text-trend-down'}`}>
                {location.metrics.revenue.trend === 'up' ? '↑' : '↓'} {location.metrics.revenue.percentage}%
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">Engagement</span>
              </div>
              <div className="text-2xl font-bold">{location.metrics.engagement.score.toFixed(1)}</div>
              <div className={`text-sm ${location.metrics.engagement.trend === 'up' ? 'text-trend-up' : 'text-trend-down'}`}>
                {location.metrics.engagement.trend === 'up' ? '↑' : '↓'} {location.metrics.engagement.percentage}%
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center mb-2">
                <Heart className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">Satisfaction</span>
              </div>
              <div className="text-2xl font-bold">{location.metrics.satisfaction.score.toFixed(1)}</div>
              <div className={`text-sm ${location.metrics.satisfaction.trend === 'up' ? 'text-trend-up' : 'text-trend-down'}`}>
                {location.metrics.satisfaction.trend === 'up' ? '↑' : '↓'} {location.metrics.satisfaction.percentage}%
              </div>
            </div>
          </div>
          
          {location.reportStatus === 'available' && (
            <Button className="w-full md:w-auto">View Full Report</Button>
          )}
          
          {location.reportStatus === 'pending' && (
            <Button disabled className="w-full md:w-auto">Report Processing</Button>
          )}
          
          {location.reportStatus === 'none' && (
            <Button variant="outline" className="w-full md:w-auto">Generate Report</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;

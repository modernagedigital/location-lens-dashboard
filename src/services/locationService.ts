
export interface Location {
  id: string;
  name: string;
  address: string;
  detailedInfo: string;
  metrics: {
    reviews: {
      count: number;
      trend: 'up' | 'down';
      percentage: number;
    };
    sessions: {
      count: number;
      trend: 'up' | 'down';
      percentage: number;
    };
    organicSessions: {
      count: number;
      trend: 'up' | 'down';
      percentage: number;
    };
    connections: {
      count: number;
      trend: 'up' | 'down';
      percentage: number;
    };
    satisfaction: {
      count: number;
      trend: 'up' | 'down';
      percentage: number;
    };
  };
  reportStatus: 'available' | 'pending' | 'none';
  isFavorite: boolean;
}

// Helper function to generate random metrics
const generateRandomMetrics = () => {
  const getRandomTrend = (): 'up' | 'down' => {
    return Math.random() > 0.5 ? 'up' : 'down';
  };

  return {
    reviews: {
      count: Math.floor(Math.random() * 500),
      trend: getRandomTrend(),
      percentage: Math.floor(Math.random() * 30),
    },
    sessions: {
      count: Math.floor(Math.random() * 10000),
      trend: getRandomTrend(),
      percentage: Math.floor(Math.random() * 20),
    },
    organicSessions: {
      count: Math.floor(Math.random() * 5000),
      trend: getRandomTrend(),
      percentage: Math.floor(Math.random() * 25),
    },
    connections: {
      count: Math.floor(Math.random() * 200),
      trend: getRandomTrend(),
      percentage: Math.floor(Math.random() * 15),
    },
    satisfaction: {
      count: Math.floor(Math.random() * 100),
      trend: getRandomTrend(),
      percentage: Math.floor(Math.random() * 10),
    },
  };
};

// Sample data for locations
const sampleLocations: Location[] = [
  {
    id: "1",
    name: "Staysure",
    address: "Northampton, NN4 7XD",
    detailedInfo: "Premium insurance provider specializing in travel services for all ages.",
    metrics: generateRandomMetrics(),
    reportStatus: 'none',
    isFavorite: false,
  },
  {
    id: "2",
    name: "Villaggio Italiano",
    address: "Hartsdale, 10530",
    detailedInfo: "Authentic Italian restaurant with traditional cuisine and warm atmosphere.",
    metrics: generateRandomMetrics(),
    reportStatus: 'none',
    isFavorite: true,
  },
  {
    id: "3",
    name: "Staysure",
    address: "Northampton, NN4 7XD",
    detailedInfo: "Insurance services for travelers and seniors with special coverage options.",
    metrics: generateRandomMetrics(),
    reportStatus: 'none',
    isFavorite: false,
  },
  {
    id: "4",
    name: "Villaggio Italiano",
    address: "Hartsdale, 10530",
    detailedInfo: "Family-owned Italian restaurant serving homemade pasta and wood-fired pizza.",
    metrics: generateRandomMetrics(),
    reportStatus: 'none',
    isFavorite: true,
  },
];

// Generate additional locations to have more rows
export const fetchLocations = (): Location[] => {
  // Create 60 locations in total for better pagination testing
  const allLocations: Location[] = [...sampleLocations];
  
  // Generate 56 more locations (for a total of 60)
  for (let i = 5; i <= 60; i++) {
    const isEven = i % 2 === 0;
    allLocations.push({
      id: i.toString(),
      name: isEven ? "Villaggio Italiano" : "Staysure",
      address: isEven ? "Hartsdale, 10530" : "Northampton, NN4 7XD",
      detailedInfo: isEven 
        ? "Italian restaurant with authentic cuisine and family recipes."
        : "Insurance provider with specialized travel coverage options.",
      metrics: generateRandomMetrics(),
      reportStatus: 'none',
      isFavorite: i % 5 === 0, // Make every 5th item a favorite
    });
  }
  
  return allLocations;
};

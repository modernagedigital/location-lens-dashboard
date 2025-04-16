export interface Location {
  id: string;
  name: string;
  address: string;
  detailedInfo: string;
  metrics: {
    visitors: {
      count: number;
      trend: 'up' | 'down';
      percentage: number;
    };
    revenue: {
      amount: number;
      trend: 'up' | 'down';
      percentage: number;
    };
    engagement: {
      score: number;
      trend: 'up' | 'down';
      percentage: number;
    };
    satisfaction: {
      score: number;
      trend: 'up' | 'down';
      percentage: number;
    };
  };
  reportStatus: 'available' | 'pending' | 'none';
  isFavorite: boolean;
}

export const fetchLocations = (): Location[] => {
  const baseLocations = [
    {
      id: "loc-001",
      name: "McDonald's - Downtown",
      address: "123 Main St, New York, NY 10001",
      detailedInfo: "24/7 operation, Drive-thru available, Wi-Fi enabled location with outdoor seating. Recently renovated with expanded dining area.",
      metrics: {
        visitors: {
          count: 5280,
          trend: 'up',
          percentage: 12
        },
        revenue: {
          amount: 48950,
          trend: 'up',
          percentage: 8
        },
        engagement: {
          score: 7.8,
          trend: 'up',
          percentage: 5
        },
        satisfaction: {
          score: 4.2,
          trend: 'down',
          percentage: 3
        }
      },
      reportStatus: 'available',
      isFavorite: true
    },
    {
      id: "loc-002",
      name: "Subway - Midtown",
      address: "456 Park Ave, New York, NY 10022",
      detailedInfo: "Open 6AM-10PM daily, Catering services available, Monthly special promotions for office workers. Dedicated mobile order pickup station.",
      metrics: {
        visitors: {
          count: 3450,
          trend: 'down',
          percentage: 5
        },
        revenue: {
          amount: 32750,
          trend: 'down',
          percentage: 3
        },
        engagement: {
          score: 6.9,
          trend: 'up',
          percentage: 2
        },
        satisfaction: {
          score: 4.5,
          trend: 'up',
          percentage: 7
        }
      },
      reportStatus: 'pending',
      isFavorite: false
    },
    {
      id: "loc-003",
      name: "Starbucks - Financial District",
      address: "789 Wall St, New York, NY 10005",
      detailedInfo: "Reserve Bar location, Mobile ordering priority, Meeting room available for reservations. Seasonal specialty drinks and exclusive merchandise.",
      metrics: {
        visitors: {
          count: 6120,
          trend: 'up',
          percentage: 15
        },
        revenue: {
          amount: 57890,
          trend: 'up',
          percentage: 11
        },
        engagement: {
          score: 8.3,
          trend: 'up',
          percentage: 9
        },
        satisfaction: {
          score: 4.7,
          trend: 'up',
          percentage: 4
        }
      },
      reportStatus: 'available',
      isFavorite: true
    },
    {
      id: "loc-004",
      name: "Chipotle - Chelsea",
      address: "321 8th Ave, New York, NY 10011",
      detailedInfo: "Eco-friendly packaging, Local sourcing initiative, App-exclusive rewards program available. Recently added dedicated pickup shelves for online orders.",
      metrics: {
        visitors: {
          count: 4370,
          trend: 'up',
          percentage: 7
        },
        revenue: {
          amount: 41250,
          trend: 'up',
          percentage: 6
        },
        engagement: {
          score: 7.2,
          trend: 'down',
          percentage: 1
        },
        satisfaction: {
          score: 4.3,
          trend: 'down',
          percentage: 2
        }
      },
      reportStatus: 'none',
      isFavorite: false
    },
    {
      id: "loc-005",
      name: "Shake Shack - Bryant Park",
      address: "111 W 40th St, New York, NY 10018",
      detailedInfo: "Outdoor seating area, Special park-themed menu, Dog-friendly location with water bowls and treats. Frequent community events and live music on weekends.",
      metrics: {
        visitors: {
          count: 5890,
          trend: 'up',
          percentage: 18
        },
        revenue: {
          amount: 61430,
          trend: 'up',
          percentage: 14
        },
        engagement: {
          score: 8.7,
          trend: 'up',
          percentage: 11
        },
        satisfaction: {
          score: 4.8,
          trend: 'up',
          percentage: 6
        }
      },
      reportStatus: 'available',
      isFavorite: true
    },
    {
      id: "loc-006",
      name: "Sweetgreen - Flatiron",
      address: "222 5th Ave, New York, NY 10010",
      detailedInfo: "Seasonal rotating menu, Composting program, Digital ordering kiosks available. Partnerships with local farmers and sustainability initiatives highlighted in-store.",
      metrics: {
        visitors: {
          count: 3970,
          trend: 'down',
          percentage: 2
        },
        revenue: {
          amount: 39120,
          trend: 'up',
          percentage: 3
        },
        engagement: {
          score: 7.5,
          trend: 'up',
          percentage: 4
        },
        satisfaction: {
          score: 4.6,
          trend: 'up',
          percentage: 5
        }
      },
      reportStatus: 'pending',
      isFavorite: false
    },
    {
      id: "loc-007",
      name: "Pret A Manger - Grand Central",
      address: "89 E 42nd St, New York, NY 10017",
      detailedInfo: "Charity donation program, Commuter-focused early hours, Weekly subscription coffee service available. Unsold food donated to local shelters daily.",
      metrics: {
        visitors: {
          count: 7210,
          trend: 'up',
          percentage: 21
        },
        revenue: {
          amount: 53670,
          trend: 'up',
          percentage: 9
        },
        engagement: {
          score: 7.1,
          trend: 'down',
          percentage: 3
        },
        satisfaction: {
          score: 4.1,
          trend: 'down',
          percentage: 8
        }
      },
      reportStatus: 'none',
      isFavorite: true
    }
  ];

  // Generate additional locations to reach 47 total
  const additionalLocations: Location[] = Array.from({ length: 40 }, (_, index) => ({
    id: `loc-${(index + 8).toString().padStart(3, '0')}`,
    name: `Location ${index + 8}`,
    address: `${index + 1} Sample St, New York, NY 1000${index + 1}`,
    detailedInfo: `Additional details for Location ${index + 8}. Unique features and description.`,
    metrics: {
      visitors: {
        count: Math.floor(Math.random() * 10000),
        trend: Math.random() > 0.5 ? 'up' : 'down',
        percentage: Math.floor(Math.random() * 20)
      },
      revenue: {
        amount: Math.floor(Math.random() * 100000),
        trend: Math.random() > 0.5 ? 'up' : 'down',
        percentage: Math.floor(Math.random() * 15)
      },
      engagement: {
        score: Number((Math.random() * 10).toFixed(1)),
        trend: Math.random() > 0.5 ? 'up' : 'down',
        percentage: Math.floor(Math.random() * 10)
      },
      satisfaction: {
        score: Number((Math.random() * 5).toFixed(1)),
        trend: Math.random() > 0.5 ? 'up' : 'down',
        percentage: Math.floor(Math.random() * 8)
      }
    },
    reportStatus: ['available', 'pending', 'none'][Math.floor(Math.random() * 3)] as 'available' | 'pending' | 'none',
    isFavorite: Math.random() > 0.7
  }));

  return [...baseLocations, ...additionalLocations];
};

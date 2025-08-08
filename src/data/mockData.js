// Mock data for analytics dashboard charts
export const mockData = {
  // Revenue data for line chart
  revenueData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue 2024',
        data: [45000, 52000, 48000, 61000, 55000, 67000, 73000, 69000, 78000, 82000, 76000, 89000],
        borderColor: 'rgba(99, 102, 241, 0.8)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Revenue 2023',
        data: [38000, 42000, 39000, 48000, 45000, 52000, 58000, 54000, 62000, 65000, 61000, 71000],
        borderColor: 'rgba(168, 85, 247, 0.8)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(168, 85, 247, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  },

  // Sales data for bar chart
  salesData: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Online Sales',
        data: [145000, 178000, 162000, 201000],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Offline Sales',
        data: [98000, 112000, 125000, 134000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Mobile Sales',
        data: [67000, 89000, 94000, 112000],
        backgroundColor: 'rgba(249, 115, 22, 0.8)',
        borderColor: 'rgba(249, 115, 22, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  },

  // User distribution data for doughnut chart
  userDistributionData: {
    labels: ['Desktop Users', 'Mobile Users', 'Tablet Users', 'Other Devices'],
    datasets: [
      {
        data: [45, 35, 15, 5],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(168, 85, 247, 1)'
        ],
        borderWidth: 2,
        hoverOffset: 10,
        cutout: '60%'
      }
    ]
  },

  // KPI metrics data
  kpiData: [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: '💰',
      description: 'Monthly revenue growth'
    },
    {
      id: 2,
      title: 'Active Users',
      value: '45.2K',
      change: '+8.3%',
      trend: 'up',
      icon: '👥',
      description: 'Active users this month'
    },
    {
      id: 3,
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      trend: 'down',
      icon: '📈',
      description: 'Overall conversion rate'
    },
    {
      id: 4,
      title: 'Avg. Order Value',
      value: '$156',
      change: '+5.7%',
      trend: 'up',
      icon: '🛒',
      description: 'Average order value'
    }
  ],

  // Traffic sources data
  trafficSources: [
    { source: 'Organic Search', visitors: 12450, percentage: 42, color: 'rgba(99, 102, 241, 0.8)' },
    { source: 'Direct', visitors: 8320, percentage: 28, color: 'rgba(34, 197, 94, 0.8)' },
    { source: 'Social Media', visitors: 5890, percentage: 20, color: 'rgba(249, 115, 22, 0.8)' },
    { source: 'Email', visitors: 2970, percentage: 10, color: 'rgba(168, 85, 247, 0.8)' }
  ],

  // Recent transactions data
  recentTransactions: [
    {
      id: 'TXN-001',
      customer: 'John Smith',
      amount: '$245.00',
      status: 'completed',
      date: '2024-01-15',
      product: 'Premium Subscription'
    },
    {
      id: 'TXN-002',
      customer: 'Sarah Johnson',
      amount: '$89.99',
      status: 'pending',
      date: '2024-01-15',
      product: 'Monthly Plan'
    },
    {
      id: 'TXN-003',
      customer: 'Mike Davis',
      amount: '$199.00',
      status: 'completed',
      date: '2024-01-14',
      product: 'Annual License'
    },
    {
      id: 'TXN-004',
      customer: 'Emily Wilson',
      amount: '$45.00',
      status: 'failed',
      date: '2024-01-14',
      product: 'Basic Plan'
    },
    {
      id: 'TXN-005',
      customer: 'David Brown',
      amount: '$299.00',
      status: 'completed',
      date: '2024-01-13',
      product: 'Enterprise Plan'
    }
  ],

  // Performance metrics over time
  performanceMetrics: {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Page Load Time (ms)',
        data: [1200, 1100, 1350, 1800, 1600, 1400],
        borderColor: 'rgba(239, 68, 68, 0.8)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Response Time (ms)',
        data: [800, 750, 920, 1100, 980, 850],
        borderColor: 'rgba(59, 130, 246, 0.8)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  },

  // Geographic data
  geographicData: [
    { country: 'United States', users: 15420, percentage: 35 },
    { country: 'United Kingdom', users: 8760, percentage: 20 },
    { country: 'Germany', users: 6580, percentage: 15 },
    { country: 'France', users: 4380, percentage: 10 },
    { country: 'Canada', users: 3940, percentage: 9 },
    { country: 'Australia', users: 2630, percentage: 6 },
    { country: 'Others', users: 2190, percentage: 5 }
  ],

  // Product performance data
  productPerformance: {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [
      {
        label: 'Sales',
        data: [450, 380, 290, 520, 340],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2
      },
      {
        label: 'Returns',
        data: [25, 18, 12, 35, 22],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2
      }
    ]
  }
};

// Utility functions for data manipulation
export const dataUtils = {
  // Generate random data for real-time updates
  generateRandomData: (min = 0, max = 100, count = 12) => {
    return Array.from({ length: count }, () => 
      Math.floor(Math.random() * (max - min + 1)) + min
    );
  },

  // Format currency values
  formatCurrency: (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  },

  // Format percentage values
  formatPercentage: (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  },

  // Calculate percentage change
  calculatePercentageChange: (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  },

  // Get trend direction
  getTrend: (change) => {
    return change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';
  },

  // Update data with random variations (for demo purposes)
  updateWithRandomVariation: (data, variationPercent = 10) => {
    return data.map(value => {
      const variation = (Math.random() - 0.5) * 2 * (variationPercent / 100);
      return Math.max(0, Math.round(value * (1 + variation)));
    });
  }
};

// Chart configuration defaults
export const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: "'Inter', sans-serif"
        },
        color: 'rgba(255, 255, 255, 0.8)'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      mode: 'index',
      intersect: false
    }
  },
  scales: {
    x: {
      grid: {
        display: true,
        color: 'rgba(255, 255, 255, 0.1)',
        drawBorder: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
        font: {
          size: 11,
          family: "'Inter', sans-serif"
        }
      }
    },
    y: {
      grid: {
        display: true,
        color: 'rgba(255, 255, 255, 0.1)',
        drawBorder: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
        font: {
          size: 11,
          family: "'Inter', sans-serif"
        }
      }
    }
  },
  animation: {
    duration: 750,
    easing: 'easeInOutQuart'
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  }
};
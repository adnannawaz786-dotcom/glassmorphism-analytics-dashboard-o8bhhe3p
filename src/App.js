import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    revenue: {
      current: 125420,
      previous: 98340,
      trend: 'up'
    },
    users: {
      current: 8542,
      previous: 7234,
      trend: 'up'
    },
    orders: {
      current: 1247,
      previous: 1156,
      trend: 'up'
    },
    conversion: {
      current: 3.24,
      previous: 2.87,
      trend: 'up'
    },
    revenueChart: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [65000, 72000, 68000, 85000, 92000, 88000, 105000, 115000, 108000, 125000, 118000, 135000]
    },
    salesChart: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
      data: [320, 280, 190, 150, 120]
    },
    trafficChart: {
      labels: ['Direct', 'Organic Search', 'Social Media', 'Email', 'Paid Ads'],
      data: [35, 28, 18, 12, 7]
    },
    performanceChart: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [
        {
          label: 'Sales',
          data: [12, 19, 15, 25, 22, 30]
        },
        {
          label: 'Leads',
          data: [8, 15, 12, 18, 16, 22]
        }
      ]
    }
  });

  const [theme, setTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In a real app, you would fetch data from an API here
        // const response = await fetch('/api/dashboard-data');
        // const data = await response.json();
        // setDashboardData(data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('dashboard-theme', newTheme);
  };

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Load saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Handle window resize for responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Refresh dashboard data
  const refreshData = async () => {
    setLoading(true);
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update with new simulated data
      setDashboardData(prevData => ({
        ...prevData,
        revenue: {
          ...prevData.revenue,
          current: prevData.revenue.current + Math.floor(Math.random() * 1000)
        },
        users: {
          ...prevData.users,
          current: prevData.users.current + Math.floor(Math.random() * 100)
        }
      }));
      
      setLoading(false);
    } catch (error) {
      console.error('Error refreshing data:', error);
      setLoading(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading Dashboard...</h2>
          <p>Preparing your analytics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${theme} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="app-container">
        <Dashboard
          data={dashboardData}
          theme={theme}
          onThemeToggle={toggleTheme}
          sidebarCollapsed={sidebarCollapsed}
          onSidebarToggle={toggleSidebar}
          onRefresh={refreshData}
          loading={loading}
        />
      </div>
      
      {/* Background elements for glassmorphism effect */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </div>
  );
}

export default App;
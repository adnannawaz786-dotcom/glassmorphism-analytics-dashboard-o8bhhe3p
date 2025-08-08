import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import LineChart from '../Charts/LineChart';
import BarChart from '../Charts/BarChart';
import DoughnutChart from '../Charts/DoughnutChart';

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 12547,
    totalRevenue: 89632,
    conversionRate: 3.24,
    activeUsers: 1847
  });

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Update data based on timeframe selection
  useEffect(() => {
    const updateData = () => {
      const multipliers = {
        '24h': 0.1,
        '7d': 1,
        '30d': 4.3,
        '90d': 13
      };

      const multiplier = multipliers[selectedTimeframe] || 1;
      
      setDashboardData({
        totalUsers: Math.floor(12547 * multiplier),
        totalRevenue: Math.floor(89632 * multiplier),
        conversionRate: Math.min(3.24 * (multiplier * 0.3), 15),
        activeUsers: Math.floor(1847 * multiplier * 0.8)
      });
    };

    updateData();
  }, [selectedTimeframe]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const formatCurrency = (num) => {
    return '$' + formatNumber(num);
  };

  const StatCard = ({ title, value, change, icon, isPositive = true }) => (
    <div className="stat-card glass-card">
      <div className="stat-card-header">
        <div className="stat-icon">
          {icon}
        </div>
        <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '+' : ''}{change}%
        </div>
      </div>
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Analytics Dashboard</h1>
          <p>Monitor your business performance in real-time</p>
        </div>
        
        <div className="timeframe-selector">
          {['24h', '7d', '30d', '90d'].map((timeframe) => (
            <button
              key={timeframe}
              className={`timeframe-btn ${selectedTimeframe === timeframe ? 'active' : ''}`}
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Users"
          value={formatNumber(dashboardData.totalUsers)}
          change="12.5"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          }
        />
        
        <StatCard
          title="Revenue"
          value={formatCurrency(dashboardData.totalRevenue)}
          change="8.2"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          }
        />
        
        <StatCard
          title="Conversion Rate"
          value={`${dashboardData.conversionRate.toFixed(2)}%`}
          change="15.3"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
            </svg>
          }
        />
        
        <StatCard
          title="Active Users"
          value={formatNumber(dashboardData.activeUsers)}
          change="5.7"
          icon={
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          }
        />
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Main Chart Row */}
        <div className="chart-row">
          <div className="chart-container large">
            <div className="chart-header">
              <h3>Revenue Trend</h3>
              <div className="chart-controls">
                <button className="chart-control-btn active">Revenue</button>
                <button className="chart-control-btn">Users</button>
              </div>
            </div>
            <LineChart timeframe={selectedTimeframe} />
          </div>
          
          <div className="chart-container medium">
            <div className="chart-header">
              <h3>Traffic Sources</h3>
            </div>
            <DoughnutChart />
          </div>
        </div>

        {/* Secondary Chart Row */}
        <div className="chart-row">
          <div className="chart-container large">
            <div className="chart-header">
              <h3>Monthly Performance</h3>
              <div className="chart-legend">
                <span className="legend-item">
                  <span className="legend-color primary"></span>
                  Current Period
                </span>
                <span className="legend-item">
                  <span className="legend-color secondary"></span>
                  Previous Period
                </span>
              </div>
            </div>
            <BarChart timeframe={selectedTimeframe} />
          </div>

          {/* Quick Stats Panel */}
          <div className="quick-stats-panel glass-card">
            <h3>Quick Stats</h3>
            <div className="quick-stats-list">
              <div className="quick-stat-item">
                <span className="quick-stat-label">Avg. Session Duration</span>
                <span className="quick-stat-value">4m 32s</span>
              </div>
              <div className="quick-stat-item">
                <span className="quick-stat-label">Bounce Rate</span>
                <span className="quick-stat-value">32.4%</span>
              </div>
              <div className="quick-stat-item">
                <span className="quick-stat-label">Page Views</span>
                <span className="quick-stat-value">156.2K</span>
              </div>
              <div className="quick-stat-item">
                <span className="quick-stat-label">New Visitors</span>
                <span className="quick-stat-value">68.5%</span>
              </div>
              <div className="quick-stat-item">
                <span className="quick-stat-label">Mobile Traffic</span>
                <span className="quick-stat-value">74.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity glass-card">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <div className="activity-content">
              <p>New user registration completed</p>
              <span className="activity-time">2 minutes ago</span>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5z"/>
              </svg>
            </div>
            <div className="activity-content">
              <p>Revenue milestone reached: $100K</p>
              <span className="activity-time">1 hour ago</span>
            </div>
          </div>
          
          <div className="activity-item">
            <div className="activity-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="activity-content">
              <p>Campaign performance improved by 15%</p>
              <span className="activity-time">3 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
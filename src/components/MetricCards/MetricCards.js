import React from 'react';
import './MetricCards.css';

const MetricCards = ({ metrics = [] }) => {
  const defaultMetrics = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$124,562',
      change: '+12.5%',
      trend: 'up',
      icon: '💰',
      description: 'vs last month'
    },
    {
      id: 2,
      title: 'Active Users',
      value: '8,429',
      change: '+8.2%',
      trend: 'up',
      icon: '👥',
      description: 'vs last month'
    },
    {
      id: 3,
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      trend: 'down',
      icon: '📈',
      description: 'vs last month'
    },
    {
      id: 4,
      title: 'Avg. Session',
      value: '4m 32s',
      change: '+15.3%',
      trend: 'up',
      icon: '⏱️',
      description: 'vs last month'
    }
  ];

  const displayMetrics = metrics.length > 0 ? metrics : defaultMetrics;

  const formatValue = (value) => {
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
      return value.toLocaleString();
    }
    return value;
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '➡️';
    }
  };

  const handleCardClick = (metric) => {
    // Optional: Add analytics tracking or navigation
    console.log(`Metric card clicked: ${metric.title}`);
  };

  const handleKeyDown = (event, metric) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(metric);
    }
  };

  if (!displayMetrics || displayMetrics.length === 0) {
    return (
      <div className="metric-cards-container">
        <div className="metric-cards-empty">
          <p>No metrics available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="metric-cards-container">
      <div className="metric-cards-grid">
        {displayMetrics.map((metric) => (
          <div
            key={metric.id}
            className={`metric-card ${metric.trend}`}
            onClick={() => handleCardClick(metric)}
            onKeyDown={(e) => handleKeyDown(e, metric)}
            tabIndex={0}
            role="button"
            aria-label={`${metric.title}: ${metric.value}, ${metric.change} ${metric.description}`}
          >
            <div className="metric-card-header">
              <div className="metric-icon" aria-hidden="true">
                {metric.icon}
              </div>
              <div className="metric-trend-indicator">
                <span className={`trend-icon ${metric.trend}`} aria-hidden="true">
                  {getTrendIcon(metric.trend)}
                </span>
              </div>
            </div>
            
            <div className="metric-content">
              <h3 className="metric-title">{metric.title}</h3>
              <div className="metric-value">{formatValue(metric.value)}</div>
              
              <div className="metric-footer">
                <span className={`metric-change ${metric.trend}`}>
                  {metric.change}
                </span>
                <span className="metric-description">
                  {metric.description}
                </span>
              </div>
            </div>
            
            <div className="metric-card-overlay" aria-hidden="true"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricCards;
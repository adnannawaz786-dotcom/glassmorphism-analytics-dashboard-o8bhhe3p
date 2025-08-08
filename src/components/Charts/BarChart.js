import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ 
  title = "Bar Chart",
  data = null,
  height = 400,
  showLegend = true,
  showGrid = true,
  animated = true,
  responsive = true
}) => {
  // Default data if none provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [65000, 59000, 80000, 81000, 56000, 95000],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(99, 102, 241, 0.9)',
        hoverBorderColor: 'rgba(99, 102, 241, 1)',
        hoverBorderWidth: 3
      },
      {
        label: 'Expenses',
        data: [45000, 39000, 60000, 61000, 36000, 75000],
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(236, 72, 153, 0.9)',
        hoverBorderColor: 'rgba(236, 72, 153, 1)',
        hoverBorderWidth: 3
      }
    ]
  };

  const chartData = data || defaultData;

  const options = {
    responsive: responsive,
    maintainAspectRatio: false,
    animation: animated ? {
      duration: 2000,
      easing: 'easeInOutQuart',
      delay: (context) => {
        return context.dataIndex * 100;
      }
    } : false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            size: 12,
            weight: '500'
          },
          color: 'rgba(255, 255, 255, 0.9)'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        titleFont: {
          family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          size: 14,
          weight: '600'
        },
        bodyFont: {
          family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          size: 13,
          weight: '400'
        },
        displayColors: true,
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            const value = context.parsed.y;
            return `${context.dataset.label}: $${value.toLocaleString()}`;
          }
        }
      },
      title: {
        display: !!title,
        text: title,
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          size: 18,
          weight: '600'
        },
        padding: {
          top: 10,
          bottom: 30
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: showGrid,
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            size: 12,
            weight: '500'
          },
          padding: 10
        },
        border: {
          color: 'rgba(255, 255, 255, 0.2)',
          width: 1
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          display: showGrid,
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            size: 12,
            weight: '500'
          },
          padding: 10,
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        },
        border: {
          color: 'rgba(255, 255, 255, 0.2)',
          width: 1
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 8,
        borderSkipped: false
      }
    }
  };

  return (
    <div className="chart-container" style={{ height: `${height}px` }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
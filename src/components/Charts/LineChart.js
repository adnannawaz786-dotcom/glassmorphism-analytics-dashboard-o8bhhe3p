import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ 
  data, 
  title = "Line Chart", 
  height = 300,
  showLegend = true,
  showGrid = true,
  tension = 0.4,
  fill = false,
  colors = ['rgba(99, 102, 241, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(245, 101, 101, 0.8)']
}) => {
  const chartRef = useRef(null);

  // Default data structure if no data is provided
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
      }
    ]
  };

  const chartData = data || defaultData;

  // Process the data to add styling
  const processedData = {
    ...chartData,
    datasets: chartData.datasets.map((dataset, index) => ({
      ...dataset,
      borderColor: colors[index % colors.length],
      backgroundColor: fill 
        ? colors[index % colors.length].replace('0.8', '0.1')
        : colors[index % colors.length],
      pointBackgroundColor: colors[index % colors.length],
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: colors[index % colors.length],
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 3,
      borderWidth: 3,
      tension: tension,
      fill: fill
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            family: 'Inter, system-ui, -apple-system, sans-serif',
            size: 12,
            weight: '500'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        titleFont: {
          family: 'Inter, system-ui, -apple-system, sans-serif',
          size: 14,
          weight: '600'
        },
        bodyFont: {
          family: 'Inter, system-ui, -apple-system, sans-serif',
          size: 13,
          weight: '500'
        },
        displayColors: true,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              // Format numbers with commas
              label += new Intl.NumberFormat().format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: showGrid,
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          font: {
            family: 'Inter, system-ui, -apple-system, sans-serif',
            size: 11,
            weight: '500'
          },
          padding: 10
        }
      },
      y: {
        display: true,
        grid: {
          display: showGrid,
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          font: {
            family: 'Inter, system-ui, -apple-system, sans-serif',
            size: 11,
            weight: '500'
          },
          padding: 15,
          callback: function(value) {
            // Format y-axis labels
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'K';
            }
            return value;
          }
        }
      }
    },
    elements: {
      line: {
        borderJoinStyle: 'round',
        borderCapStyle: 'round'
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    },
    onHover: (event, activeElements) => {
      if (chartRef.current) {
        chartRef.current.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
      }
    }
  };

  useEffect(() => {
    // Cleanup function to destroy chart instance on unmount
    return () => {
      if (chartRef.current) {
        const chart = ChartJS.getChart(chartRef.current);
        if (chart) {
          chart.destroy();
        }
      }
    };
  }, []);

  return (
    <div 
      className="line-chart-container"
      style={{
        height: `${height}px`,
        width: '100%',
        position: 'relative'
      }}
    >
      {title && (
        <h3 
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '1rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
          }}
        >
          {title}
        </h3>
      )}
      <div style={{ height: title ? `${height - 40}px` : `${height}px` }}>
        <Line 
          ref={chartRef}
          data={processedData} 
          options={options}
        />
      </div>
    </div>
  );
};

export default LineChart;
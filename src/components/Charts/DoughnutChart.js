import React, { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = ({ 
  title = 'Distribution Chart',
  data = [],
  labels = [],
  colors = [
    'rgba(99, 102, 241, 0.8)',
    'rgba(34, 197, 94, 0.8)',
    'rgba(251, 191, 36, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(168, 85, 247, 0.8)',
    'rgba(6, 182, 212, 0.8)'
  ],
  borderColors = [
    'rgba(99, 102, 241, 1)',
    'rgba(34, 197, 94, 1)',
    'rgba(251, 191, 36, 1)',
    'rgba(239, 68, 68, 1)',
    'rgba(168, 85, 247, 1)',
    'rgba(6, 182, 212, 1)'
  ],
  showLegend = true,
  showTooltip = true,
  cutout = '60%',
  height = 300,
  animationDuration = 1000
}) => {
  const chartRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Chart data configuration
  const chartData = {
    labels: labels.length > 0 ? labels : data.map((_, index) => `Category ${index + 1}`),
    datasets: [
      {
        data: data,
        backgroundColor: colors.slice(0, data.length),
        borderColor: borderColors.slice(0, data.length),
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 8,
        spacing: 2
      }
    ]
  };

  // Chart options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: cutout,
    plugins: {
      title: {
        display: !!title,
        text: title,
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          size: 16,
          weight: 'bold',
          family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      legend: {
        display: showLegend,
        position: 'bottom',
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              const dataset = data.datasets[0];
              const total = dataset.data.reduce((sum, value) => sum + value, 0);
              
              return data.labels.map((label, i) => {
                const value = dataset.data[i];
                const percentage = ((value / total) * 100).toFixed(1);
                
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.borderColor[i],
                  lineWidth: dataset.borderWidth,
                  hidden: isNaN(value) || chart.getDatasetMeta(0).data[i].hidden,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        enabled: showTooltip,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
          family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        },
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      duration: isVisible ? animationDuration : 0,
      easing: 'easeOutCubic',
      animateRotate: true,
      animateScale: true
    },
    hover: {
      animationDuration: 200
    },
    interaction: {
      intersect: false,
      mode: 'nearest'
    },
    onHover: (event, activeElements) => {
      event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
    }
  };

  // Calculate total and center text
  const total = data.reduce((sum, value) => sum + value, 0);

  return (
    <div 
      ref={chartRef}
      className="doughnut-chart-container"
      style={{
        position: 'relative',
        height: `${height}px`,
        width: '100%'
      }}
    >
      <Doughnut data={chartData} options={options} />
      
      {/* Center text overlay */}
      <div 
        className="chart-center-text"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          color: 'rgba(255, 255, 255, 0.9)',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}
      >
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '0.25rem'
        }}>
          {total.toLocaleString()}
        </div>
        <div style={{
          fontSize: '0.875rem',
          opacity: 0.7
        }}>
          Total
        </div>
      </div>

      <style jsx>{`
        .doughnut-chart-container {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .doughnut-chart-container:hover {
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .doughnut-chart-container {
            padding: 16px;
            border-radius: 12px;
          }
          
          .chart-center-text > div:first-child {
            font-size: 1.25rem !important;
          }
          
          .chart-center-text > div:last-child {
            font-size: 0.75rem !important;
          }
        }

        @media (max-width: 480px) {
          .doughnut-chart-container {
            padding: 12px;
          }
          
          .chart-center-text > div:first-child {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DoughnutChart;
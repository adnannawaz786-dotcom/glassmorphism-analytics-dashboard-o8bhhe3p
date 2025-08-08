// Chart.js configuration and themes for glassmorphism analytics dashboard
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

// Color palette for glassmorphism theme
export const colors = {
  primary: {
    gradient: ['rgba(99, 102, 241, 0.8)', 'rgba(168, 85, 247, 0.4)'],
    solid: 'rgba(99, 102, 241, 0.8)',
    border: 'rgba(99, 102, 241, 1)',
    light: 'rgba(99, 102, 241, 0.3)'
  },
  secondary: {
    gradient: ['rgba(59, 130, 246, 0.8)', 'rgba(147, 51, 234, 0.4)'],
    solid: 'rgba(59, 130, 246, 0.8)',
    border: 'rgba(59, 130, 246, 1)',
    light: 'rgba(59, 130, 246, 0.3)'
  },
  success: {
    gradient: ['rgba(34, 197, 94, 0.8)', 'rgba(16, 185, 129, 0.4)'],
    solid: 'rgba(34, 197, 94, 0.8)',
    border: 'rgba(34, 197, 94, 1)',
    light: 'rgba(34, 197, 94, 0.3)'
  },
  warning: {
    gradient: ['rgba(251, 191, 36, 0.8)', 'rgba(245, 158, 11, 0.4)'],
    solid: 'rgba(251, 191, 36, 0.8)',
    border: 'rgba(251, 191, 36, 1)',
    light: 'rgba(251, 191, 36, 0.3)'
  },
  danger: {
    gradient: ['rgba(239, 68, 68, 0.8)', 'rgba(220, 38, 127, 0.4)'],
    solid: 'rgba(239, 68, 68, 0.8)',
    border: 'rgba(239, 68, 68, 1)',
    light: 'rgba(239, 68, 68, 0.3)'
  },
  info: {
    gradient: ['rgba(6, 182, 212, 0.8)', 'rgba(14, 165, 233, 0.4)'],
    solid: 'rgba(6, 182, 212, 0.8)',
    border: 'rgba(6, 182, 212, 1)',
    light: 'rgba(6, 182, 212, 0.3)'
  },
  text: {
    primary: 'rgba(255, 255, 255, 0.9)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.5)'
  },
  background: {
    card: 'rgba(255, 255, 255, 0.1)',
    overlay: 'rgba(255, 255, 255, 0.05)'
  }
};

// Multi-color dataset for charts
export const multiColorPalette = [
  colors.primary.solid,
  colors.secondary.solid,
  colors.success.solid,
  colors.warning.solid,
  colors.danger.solid,
  colors.info.solid,
  'rgba(168, 85, 247, 0.8)',
  'rgba(236, 72, 153, 0.8)',
  'rgba(20, 184, 166, 0.8)',
  'rgba(132, 204, 22, 0.8)'
];

// Create gradient for canvas context
export const createGradient = (ctx, colorArray, direction = 'vertical') => {
  if (!ctx || !colorArray || colorArray.length < 2) return colorArray[0] || colors.primary.solid;
  
  const gradient = direction === 'vertical' 
    ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
    : ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
  
  colorArray.forEach((color, index) => {
    gradient.addColorStop(index / (colorArray.length - 1), color);
  });
  
  return gradient;
};

// Common chart options for glassmorphism theme
export const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index'
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        color: colors.text.primary,
        font: {
          family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          size: 12,
          weight: '500'
        },
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 8,
        boxHeight: 8
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      titleColor: colors.text.primary,
      bodyColor: colors.text.secondary,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 12,
      displayColors: true,
      titleFont: {
        family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        size: 13,
        weight: '600'
      },
      bodyFont: {
        family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        size: 12,
        weight: '400'
      },
      caretPadding: 8,
      caretSize: 6,
      titleMarginBottom: 8,
      footerMarginTop: 8,
      filter: function(tooltipItem) {
        return tooltipItem.parsed.y !== null;
      }
    }
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: true,
        color: 'rgba(255, 255, 255, 0.1)',
        lineWidth: 1,
        drawBorder: false
      },
      ticks: {
        color: colors.text.secondary,
        font: {
          family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          size: 11,
          weight: '400'
        },
        padding: 8,
        maxTicksLimit: 8
      },
      border: {
        display: false
      }
    },
    y: {
      display: true,
      grid: {
        display: true,
        color: 'rgba(255, 255, 255, 0.1)',
        lineWidth: 1,
        drawBorder: false
      },
      ticks: {
        color: colors.text.secondary,
        font: {
          family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          size: 11,
          weight: '400'
        },
        padding: 8,
        maxTicksLimit: 6,
        callback: function(value) {
          if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + 'M';
          } else if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'K';
          }
          return value;
        }
      },
      border: {
        display: false
      }
    }
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 6,
      borderWidth: 2,
      hoverBorderWidth: 3
    },
    line: {
      borderWidth: 3,
      tension: 0.4
    },
    bar: {
      borderRadius: 6,
      borderSkipped: false
    }
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart'
  }
};

// Line chart specific configuration
export const lineChartConfig = {
  ...commonChartOptions,
  plugins: {
    ...commonChartOptions.plugins,
    filler: {
      propagate: false
    }
  },
  elements: {
    ...commonChartOptions.elements,
    point: {
      ...commonChartOptions.elements.point,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: colors.primary.border,
      hoverBackgroundColor: 'rgba(255, 255, 255, 1)',
      hoverBorderColor: colors.primary.border
    }
  }
};

// Bar chart specific configuration
export const barChartConfig = {
  ...commonChartOptions,
  elements: {
    ...commonChartOptions.elements,
    bar: {
      ...commonChartOptions.elements.bar,
      borderRadius: {
        topLeft: 8,
        topRight: 8,
        bottomLeft: 0,
        bottomRight: 0
      }
    }
  }
};

// Doughnut chart specific configuration
export const doughnutChartConfig = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        color: colors.text.primary,
        font: {
          family: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          size: 12,
          weight: '500'
        },
        padding: 15,
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 10,
        boxHeight: 10
      }
    },
    tooltip: {
      ...commonChartOptions.plugins.tooltip,
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.parsed;
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${label}: ${value.toLocaleString()} (${percentage}%)`;
        }
      }
    }
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      hoverBorderWidth: 3,
      hoverBorderColor: 'rgba(255, 255, 255, 0.3)'
    }
  },
  animation: {
    duration: 1200,
    easing: 'easeInOutQuart'
  }
};

// Utility function to generate dataset with glassmorphism styling
export const createDataset = (label, data, type = 'line', colorIndex = 0) => {
  const colorPalette = Object.values(colors).slice(0, -2); // Exclude text and background
  const selectedColor = colorPalette[colorIndex % colorPalette.length];
  
  const baseDataset = {
    label,
    data,
    borderColor: selectedColor.border,
    backgroundColor: selectedColor.solid,
    borderWidth: type === 'line' ? 3 : 2,
    tension: type === 'line' ? 0.4 : 0,
    pointBackgroundColor: 'rgba(255, 255, 255, 0.9)',
    pointBorderColor: selectedColor.border,
    pointRadius: type === 'line' ? 4 : 0,
    pointHoverRadius: type === 'line' ? 6 : 0,
    pointBorderWidth: 2,
    pointHoverBorderWidth: 3
  };

  // Add specific properties based on chart type
  switch (type) {
    case 'line':
      return {
        ...baseDataset,
        fill: true,
        backgroundColor: (ctx) => {
          if (!ctx.chart.chartArea) return selectedColor.light;
          return createGradient(ctx.chart.ctx, selectedColor.gradient);
        }
      };
    
    case 'bar':
      return {
        ...baseDataset,
        borderRadius: {
          topLeft: 8,
          topRight: 8,
          bottomLeft: 0,
          bottomRight: 0
        },
        borderSkipped: false
      };
    
    case 'doughnut':
      return {
        ...baseDataset,
        backgroundColor: multiColorPalette.slice(0, data.length),
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: 'rgba(255, 255, 255, 0.3)'
      };
    
    default:
      return baseDataset;
  }
};

// Responsive breakpoint configurations
export const responsiveConfig = {
  mobile: {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 10
          },
          padding: 10
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 9
          },
          maxTicksLimit: 4
        }
      },
      y: {
        ticks: {
          font: {
            size: 9
          },
          maxTicksLimit: 4
        }
      }
    }
  },
  tablet: {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 11
          },
          padding: 15
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10
          },
          maxTicksLimit: 6
        }
      },
      y: {
        ticks: {
          font: {
            size: 10
          },
          maxTicksLimit: 5
        }
      }
    }
  }
};

// Export default configuration object
export default {
  colors,
  multiColorPalette,
  createGradient,
  commonChartOptions,
  lineChartConfig,
  barChartConfig,
  doughnutChartConfig,
  createDataset,
  responsiveConfig
};
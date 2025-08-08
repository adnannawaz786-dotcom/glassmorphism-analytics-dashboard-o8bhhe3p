import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange, isOpen, onToggle }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      description: 'Overview & Analytics'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: '📈',
      description: 'Detailed Reports'
    },
    {
      id: 'revenue',
      label: 'Revenue',
      icon: '💰',
      description: 'Financial Data'
    },
    {
      id: 'users',
      label: 'Users',
      icon: '👥',
      description: 'User Statistics'
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: '⚡',
      description: 'System Metrics'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: '📋',
      description: 'Generated Reports'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      description: 'Configuration'
    }
  ];

  const handleItemClick = (itemId) => {
    onSectionChange(itemId);
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      onToggle();
    }
  };

  const handleKeyDown = (event, itemId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleItemClick(itemId);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      
      <aside 
        className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <span className="sidebar__logo-icon">✨</span>
            <h2 className="sidebar__logo-text">Analytics</h2>
          </div>
          <button
            className="sidebar__toggle sidebar__toggle--close"
            onClick={onToggle}
            aria-label="Close sidebar"
            type="button"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar__nav">
          <ul className="sidebar__menu" role="menubar">
            {menuItems.map((item) => (
              <li key={item.id} className="sidebar__menu-item" role="none">
                <button
                  className={`sidebar__link ${
                    activeSection === item.id ? 'sidebar__link--active' : ''
                  }`}
                  onClick={() => handleItemClick(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  role="menuitem"
                  tabIndex={0}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  type="button"
                >
                  <span className="sidebar__link-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div className="sidebar__link-content">
                    <span className="sidebar__link-label">{item.label}</span>
                    <span className="sidebar__link-description">
                      {item.description}
                    </span>
                  </div>
                  {activeSection === item.id && (
                    <div className="sidebar__link-indicator" aria-hidden="true" />
                  )}
                </button>
                
                {/* Tooltip for collapsed state */}
                {hoveredItem === item.id && (
                  <div className="sidebar__tooltip" role="tooltip">
                    <span className="sidebar__tooltip-text">{item.label}</span>
                    <div className="sidebar__tooltip-arrow" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__user-avatar">
              <span>👤</span>
            </div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">Admin User</span>
              <span className="sidebar__user-role">Administrator</span>
            </div>
          </div>
          
          <button
            className="sidebar__logout"
            onClick={() => console.log('Logout clicked')}
            aria-label="Logout"
            type="button"
          >
            <span aria-hidden="true">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
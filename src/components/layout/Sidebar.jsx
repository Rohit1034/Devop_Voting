import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useVoteData } from '../../hooks/useVoteData';
import { formatNumber } from '../../utils/helpers';
import Button from '../common/Button';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { voteData } = useVoteData();

  const menuItems = [
    {
      path: ROUTES.HOME,
      label: 'Home',
      icon: '🏠',
      description: 'Vote and view results'
    },
    {
      path: ROUTES.VOTER_LIST,
      label: 'Yes Voters',
      icon: '👥',
      description: `${formatNumber(voteData.yesCount)} people voting yes`,
      badge: voteData.yesCount
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
         {/* <div className="sidebar-header">
          <h3 className="sidebar-title">Menu</h3>
          <Button
            variant="ghost"
            size="small"
            onClick={onClose}
            icon="×"
            className="sidebar-close"
          />
        </div> */}

          {/* <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.path}
                className={`sidebar-nav-item ${location.pathname === item.path ? 'sidebar-nav-item-active' : ''}`}
                onClick={() => handleNavigation(item.path)}
              >
                <div className="sidebar-nav-item-content">
                  <div className="sidebar-nav-item-main">
                    <span className="sidebar-nav-item-icon">{item.icon}</span>
                    <span className="sidebar-nav-item-label">{item.label}</span>
                    {item.badge > 0 && (
                      <span className="sidebar-nav-item-badge">{item.badge}</span>
                    )}
                  </div>
                  {item.description && (
                    <span className="sidebar-nav-item-description">{item.description}</span>
                  )}
                </div>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-stats">
              <div className="sidebar-stat">
                <span className="sidebar-stat-label">Total Votes Today</span>
                <span className="sidebar-stat-value">{formatNumber(voteData.totalVotes)}</span>
              </div>
            </div>
          </div> */}
      </aside>
    </>
  );
};

export default Sidebar;

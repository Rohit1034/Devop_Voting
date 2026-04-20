import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useVoteData } from '../../hooks/useVoteData';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Button from '../common/Button';
import Sidebar from './Sidebar';
import './MobileNav.css';

const MobileNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const location = useLocation();
  const { voteData } = useVoteData();

  if (!isMobile) return null;

  const isHomePage = location.pathname === ROUTES.HOME;
  const isVoterListPage = location.pathname === ROUTES.VOTER_LIST;

  return (
    <>
      {/* <nav className="mobile-nav">
        <div className="mobile-nav-container">
          <Button
            variant="ghost"
            size="small"
            onClick={() => setSidebarOpen(true)}
            icon="☰"
            className="mobile-nav-menu"
          />

          <div className="mobile-nav-center">
            <Button
              variant={isHomePage ? 'primary' : 'ghost'}
              size="small"
              onClick={() => navigate(ROUTES.HOME)}
              icon="🏠"
              className="mobile-nav-item"
            >
              Home
            </Button>

            <Button
              variant={isVoterListPage ? 'primary' : 'ghost'}
              size="small"
              onClick={() => navigate(ROUTES.VOTER_LIST)}
              icon="👥"
              className="mobile-nav-item"
            >
              Voters ({voteData.yesCount})
            </Button>
          </div>

          <div className="mobile-nav-stats">
            <span className="mobile-nav-stat">
              {voteData.totalVotes} votes
            </span>
          </div>
        </div>
      </nav> */}

      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
    </>
  );
};

export default MobileNav;

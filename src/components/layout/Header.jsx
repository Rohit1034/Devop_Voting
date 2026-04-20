import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { ROUTES } from '../../utils/constants';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { 
  MdLogout, 
  MdPerson
} from 'react-icons/md';
import toast from 'react-hot-toast';
import './Header.css';

const Header = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { user } = useAuth();
  useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoggingOut(true);
    
    try {
      const result = await signOut();
      if (result.success) {
        toast.success('Signed out successfully');
        navigate(ROUTES.LOGIN);
      } else {
        toast.error('Failed to sign out');
      }
    } catch (error) {
      toast.error('Failed to sign out');
    } finally {
      setLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <button 
              className="header-logo"
              onClick={() => navigate(ROUTES.HOME)}
            >
              <img src="/logo.png" alt="Logo" className="header-logo-image" />
              {/* <span className="header-logo-emoji">🍳</span> */}
              {/* <MdRestaurant className="header-logo-icon" /> */}
              <span className="header-logo-text">GDC's HighTEA</span>
            </button>
          </div>

          <div className="header-right">
            {user && (
              <>
                <div className="header-user-info">
                  <MdPerson className="header-user-icon" />
                  <span className="header-greeting">
                    Hello, {user.displayName || 'User'}!
                  </span>
                </div>

                <Button
                  variant="danger"
                  size="small"
                  onClick={() => setShowLogoutModal(true)}
                  className="header-logout-btn"
                >
                  <span>Sign Out</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Sign Out"
        size="small"
      >
        <div className="logout-modal-content">
          <p>Are you sure you want to sign out?</p>
          <div className="logout-modal-actions">
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(false)}
              disabled={loggingOut}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleLogout}
              loading={loggingOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;

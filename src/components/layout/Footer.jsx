import React from 'react';
import { VOTING_HOURS } from '../../utils/constants';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">Voting Hours</h4>
            <p className="footer-text">
              🕕 Opens: {VOTING_HOURS.OPEN_HOUR}:00 PM previous day
            </p>
            <p className="footer-text">
              🕖 Closes: {VOTING_HOURS.CLOSE_HOUR}:00 AM breakfast day
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Notifications</h4>
            <p className="footer-text">
              🔔 Daily reminder at 9:00 PM
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">How it Works</h4>
            <p className="footer-text">
              1. Vote between 12 PM - 10 AM
            </p>
            <p className="footer-text">
              2. One vote per person per day
            </p>
            <p className="footer-text">
              3. Results are live and real-time
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2025 HighTEA Voting App. Made with ❤️ for better workplace collaboration.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

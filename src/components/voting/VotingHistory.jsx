import React, { useState, useEffect } from 'react';
import { getVoteHistory } from '../../services/voteService';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/dateUtils';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import './VotingHistory.css';

const VotingHistory = ({ limit = 10 }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.uid) return;

      try {
        setLoading(true);
        const userHistory = await getVoteHistory(user.uid, limit);
        setHistory(userHistory);
        setError(null);
      } catch (err) {
        console.error('Error fetching vote history:', err);
        setError('Failed to load voting history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user?.uid, limit]);

  if (loading) {
    return (
      <Card padding="large">
        <LoadingSpinner message="Loading voting history..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card padding="large">
        <div className="voting-history-error">
          <span className="voting-history-error-icon">⚠️</span>
          <span>{error}</span>
        </div>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card padding="large">
        <div className="voting-history-empty">
          <div className="voting-history-empty-icon">📊</div>
          <h3>No Voting History</h3>
          <p>Your voting history will appear here once you start voting.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="voting-history-card" padding="large">
      <h3 className="voting-history-title">📊 Your Voting History</h3>
      
      <div className="voting-history-list">
        {history.map((vote, index) => (
          <div key={`${vote.date}-${index}`} className="voting-history-item">
            <div className="voting-history-date">
              {formatDate(vote.date)}
            </div>
            <div className={`voting-history-vote voting-history-vote-${vote.vote.toLowerCase()}`}>
              <span className="voting-history-vote-icon">
                {vote.vote === 'Yes' ? '👍' : '👎'}
              </span>
              <span className="voting-history-vote-text">{vote.vote}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default VotingHistory;

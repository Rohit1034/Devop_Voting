import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { formatNumber } from '../../utils/helpers';
import { MdBarChart, MdGroup, MdThumbUp, MdThumbDown } from 'react-icons/md';
import './VoteResults.css';

const VoteResults = ({ 
  voteData, 
  onViewVoters, 
  loading = false 
}) => {
  const { yesCount, noCount, totalVotes } = voteData;
  
  const yesPercentage = totalVotes > 0 ? Math.round((yesCount / totalVotes) * 100) : 0;
  const noPercentage = totalVotes > 0 ? Math.round((noCount / totalVotes) * 100) : 0;

  return (
    <Card className="vote-results-card" padding="large">
      <div className="vote-results-header">
        <h2 className="vote-results-title">
          <MdBarChart className="vote-results-title-icon" />
          Live Results
        </h2>
        <div className="vote-results-total">
          Total Votes: <strong>{formatNumber(totalVotes)}</strong>
        </div>
      </div>

      <div className="vote-results-stats">
        <div className="vote-stat vote-stat-yes">
          <div className="vote-stat-header">
            <MdThumbUp className="vote-stat-icon" />
            <span className="vote-stat-label">Yes</span>
          </div>
          <div className="vote-stat-number">{formatNumber(yesCount)}</div>
          <div className="vote-stat-percentage">{yesPercentage}%</div>
          <div className="vote-stat-bar">
            <div 
              className="vote-stat-bar-fill vote-stat-bar-yes"
              style={{ width: `${yesPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="vote-stat vote-stat-no">
          <div className="vote-stat-header">
            <MdThumbDown className="vote-stat-icon" />
            <span className="vote-stat-label">No</span>
          </div>
          <div className="vote-stat-number">{formatNumber(noCount)}</div>
          <div className="vote-stat-percentage">{noPercentage}%</div>
          <div className="vote-stat-bar">
            <div 
              className="vote-stat-bar-fill vote-stat-bar-no"
              style={{ width: `${noPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="vote-results-actions">
        <Button
          variant="primary"
          onClick={onViewVoters}
          disabled={yesCount === 0}
          loading={loading}
        >
          <span>View Voters</span>
        </Button>
      </div>
    </Card>
  );
};

export default VoteResults;

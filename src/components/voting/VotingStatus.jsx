import React from 'react';
import { 
  isVotingWindowOpen, 
  getTimeUntilVotingOpens, 
  getTimeUntilVotingCloses,
  formatTimeRemaining 
} from '../../utils/dateUtils';
import { useTimer } from '../../hooks/useTimer';
import Card from '../common/Card';
import './VotingStatus.css';

const VotingStatus = () => {
  const votingOpen = isVotingWindowOpen();
  const timeUntilOpens = getTimeUntilVotingOpens();
  const timeUntilCloses = getTimeUntilVotingCloses();
  
  const targetTime = votingOpen ? timeUntilCloses : timeUntilOpens;
  const { timeLeft } = useTimer(targetTime ? Date.now() + targetTime : null);

  const getStatusMessage = () => {
    if (votingOpen) {
      return {
        status: 'open',
        title: '🟢 Voting is Open',
        message: 'Cast your vote for HighTEA!',
        timeLabel: 'Closes in:',
        timeValue: formatTimeRemaining(timeLeft)
      };
    } else {
      return {
        status: 'closed',
        title: '🔴 Voting is Closed',
        message: 'Voting is only open from 12 PM to 10 AM',
        timeLabel: 'Opens in:',
        timeValue: formatTimeRemaining(timeLeft)
      };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <Card className={`voting-status voting-status-${statusInfo.status}`} padding="medium">
      {/* <div className="voting-status-content">
        <h3 className="voting-status-title">{statusInfo.title}</h3>
        <p className="voting-status-message">{statusInfo.message}</p>
        
        {timeLeft > 0 && (
          <div className="voting-status-timer">
            <span className="voting-status-timer-label">{statusInfo.timeLabel}</span>
            <span className="voting-status-timer-value">{statusInfo.timeValue}</span>
          </div>
        )}
      </div> */}
    </Card>
  );
};

export default VotingStatus;

import { VOTING_HOURS } from './constants';

export const getTomorrowDateKey = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
};

export const getCurrentDateKey = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const isVotingWindowOpen = () => {
  const now = new Date();
  const currentHour = now.getHours();
  
  // Voting is open from 12:01 PM to 10 AM (next day)
  return currentHour >= VOTING_HOURS.OPEN_HOUR || currentHour < VOTING_HOURS.CLOSE_HOUR;
};

export const getTimeUntilVotingOpens = () => {
  const now = new Date();
  const currentHour = now.getHours();
  
  if (isVotingWindowOpen()) {
    return null; // Voting is already open
  }
  
  const votingOpenTime = new Date();
  votingOpenTime.setHours(VOTING_HOURS.OPEN_HOUR, 0, 0, 0);
  
  // If current time is past voting close time but before voting open time
  if (currentHour >= VOTING_HOURS.CLOSE_HOUR) {
    // Voting opens today at 12.01 PM
    return votingOpenTime.getTime() - now.getTime();
  } else {
    // This shouldn't happen with current logic, but just in case
    return 0;
  }
};

export const getTimeUntilVotingCloses = () => {
  const now = new Date();
  const currentHour = now.getHours();
  
  if (!isVotingWindowOpen()) {
    return null; // Voting is already closed
  }
  
  const votingCloseTime = new Date();
  
  // If it's currently between 12:01 PM and midnight
  if (currentHour >= VOTING_HOURS.OPEN_HOUR) {
    // Voting closes tomorrow at 10 AM
    votingCloseTime.setDate(votingCloseTime.getDate() + 1);
    votingCloseTime.setHours(VOTING_HOURS.CLOSE_HOUR, 0, 0, 0);
  } else {
    // It's between midnight and 10 AM, voting closes today at 10 AM
    votingCloseTime.setHours(VOTING_HOURS.CLOSE_HOUR, 0, 0, 0);
  }
  
  return votingCloseTime.getTime() - now.getTime();
};

export const formatTimeRemaining = (milliseconds) => {
  if (!milliseconds || milliseconds <= 0) return '0m';
  
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours === 0) {
    return `${minutes}m`;
  }
  
  return `${hours}h ${minutes}m`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const isToday = (dateString) => {
  const today = getCurrentDateKey();
  return dateString === today;
};

export const isTomorrow = (dateString) => {
  const tomorrow = getTomorrowDateKey();
  return dateString === tomorrow;
};

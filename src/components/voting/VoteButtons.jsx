import React from 'react';
import Button from '../common/Button';
import { VOTE_OPTIONS } from '../../utils/constants';
import { MdThumbUp, MdThumbDown, MdCheck } from 'react-icons/md';
import './VoteButtons.css';

const VoteButtons = ({
  onVote,
  userVote,
  disabled = false,
  loading = false,
  votingOpen = true
}) => {
  const handleVoteYes = () => onVote(VOTE_OPTIONS.YES);
  const handleVoteNo = () => onVote(VOTE_OPTIONS.NO);

  const isYesSelected = userVote === VOTE_OPTIONS.YES;
  const isNoSelected = userVote === VOTE_OPTIONS.NO;

  return (
    <div className="vote-buttons-container">
      <div className="vote-buttons">
        <button
          className={`vote-button vote-button-yes ${isYesSelected ? 'vote-button-selected' : ''}`}
          onClick={handleVoteYes}
          disabled={disabled || !votingOpen || userVote}
        >
          <MdThumbUp className="vote-button-icon" />
          <span className="vote-button-text">Yes</span>
        </button>

        <button
          className={`vote-button vote-button-no ${isNoSelected ? 'vote-button-selected' : ''}`}
          onClick={handleVoteNo}
          disabled={disabled || !votingOpen || userVote}
        >
          <MdThumbDown className="vote-button-icon" />
          <span className="vote-button-text">No</span>
        </button>
      </div>

      {userVote && (
        <div className="vote-confirmation">
          <MdCheck className="vote-confirmation-icon" />
          <span>You voted: <strong>{userVote}</strong></span>
        </div>
      )}

      {!votingOpen && (
        <div className="vote-closed-message">
          🔒 Voting is currently closed
        </div>
      )}
    </div>
  );
};

export default VoteButtons;

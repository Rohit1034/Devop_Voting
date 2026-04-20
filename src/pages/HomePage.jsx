import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { castVote } from '../services/voteService';
import { useAuth } from '../hooks/useAuth';
import { useVoteData } from '../hooks/useVoteData';
import { isVotingWindowOpen, getTomorrowDateKey, formatDate } from '../utils/dateUtils';
import { ROUTES } from '../utils/constants';
import Layout from '../components/layout/Layout';
import VoteButtons from '../components/voting/VoteButtons';
import VoteResults from '../components/voting/VoteResults';
// REMOVED: import VotingStatus from '../components/voting/VotingStatus';
import VotingHistory from '../components/voting/VotingHistory';
import MobileNav from '../components/layout/MobileNav';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import './HomePage.css';

const HomePage = () => {
  const [votingLoading, setVotingLoading] = useState(null);
  const { user } = useAuth();
  const { voteData, userVote, loading, error, refetchUserVote } = useVoteData();
  const navigate = useNavigate();

  const votingOpen = isVotingWindowOpen();
  const tomorrowDate = getTomorrowDateKey();

  const handleVote = async (voteChoice) => {
    if (!votingOpen) {
      toast.error('Voting is currently closed. Voting is open from 6 PM to 7 AM.');
      return;
    }

    if (userVote) {
      toast.error('You have already voted for tomorrow\'s breakfast.');
      return;
    }

    setVotingLoading(voteChoice);

    try {
      const result = await castVote(user.uid, user.displayName || 'Anonymous', user.email, voteChoice);
      
      if (result.success) {
        toast.success(`You voted "${voteChoice}" for HighTEA!`);
        await refetchUserVote();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to cast vote. Please try again.');
    } finally {
      setVotingLoading(null);
    }
  };

  const handleViewVoters = () => {
    navigate(ROUTES.VOTER_LIST, { 
      state: { voters: voteData.yesVoters } 
    });
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner fullScreen message="Loading vote data..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="home-error">
          <Card padding="large">
            <div className="home-error-content">
              <span className="home-error-icon">⚠️</span>
              <h2>Error Loading Data</h2>
              <p>{error}</p>
              <button 
                className="home-error-retry" 
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="home-page">
        <div className="home-container">
          {/* REMOVED: Voting Status Component */}
          {/* <VotingStatus /> */}

          {/* Main Voting Card */}
          <Card className="home-voting-card" padding="large">
            <div className="home-voting-header">
              <h1 className="home-voting-title">GDC's HighTEA</h1>
              <p className="home-voting-date">
                {formatDate(tomorrowDate)}
              </p>
            </div>

            {/* Inline voting status instead of separate component */}
            <div className={`voting-status ${votingOpen ? 'voting-status-open' : 'voting-status-closed'}`}>
              {votingOpen ? (
                <>
                  <div>🟢 Voting is Open</div>
                  <div className="voting-status-timer">Vote now for tomorrow's HighTEA!</div>
                </>
              ) : (
                <>
                  <div>🔴 Voting is Closed</div>
                  <div className="voting-status-timer">Opens at 12 PM</div>
                </>
              )}
            </div>

            <VoteButtons
              onVote={handleVote}
              userVote={userVote}
              loading={votingLoading}
              votingOpen={votingOpen}
            />
          </Card>

          {/* Vote Results */}
          <VoteResults
            voteData={voteData}
            onViewVoters={handleViewVoters}
          />

          {/* Voting History */}
          <VotingHistory limit={5} />
        </div>

        <MobileNav />
      </div>
    </Layout>
  );
};

export default HomePage;
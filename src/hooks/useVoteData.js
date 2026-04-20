import { useState, useEffect } from 'react';
import { getVoteCount, getUserVote } from '../services/voteService';
import { useAuth } from './useAuth';

export const useVoteData = () => {
  const [voteData, setVoteData] = useState({
    yesCount: 0,
    noCount: 0,
    yesVoters: [],
    totalVotes: 0
  });
  const [userVote, setUserVote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    let unsubscribe = null;

    const fetchUserVote = async () => {
      if (user?.uid) {
        try {
          const vote = await getUserVote(user.uid);
          setUserVote(vote);
        } catch (err) {
          console.error('Error fetching user vote:', err);
          setError(err.message);
        }
      }
    };

    const setupVoteListener = () => {
      try {
        unsubscribe = getVoteCount((data) => {
          setVoteData(data);
          setLoading(false);
          setError(null);
        });
      } catch (err) {
        console.error('Error setting up vote listener:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserVote();
    setupVoteListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const refetchUserVote = async () => {
    if (user?.uid) {
      try {
        const vote = await getUserVote(user.uid);
        setUserVote(vote);
        setError(null);
      } catch (err) {
        console.error('Error refetching user vote:', err);
        setError(err.message);
      }
    }
  };

  return {
    voteData,
    userVote,
    loading,
    error,
    refetchUserVote
  };
};

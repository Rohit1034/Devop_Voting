import { ref, set, get, onValue, off } from 'firebase/database';
import { database } from './firebase';
import { isVotingWindowOpen, getTomorrowDateKey } from '../utils/dateUtils';

export const castVote = async (userId, userName, userEmail, voteChoice) => {
  try {
    if (!isVotingWindowOpen()) {
      throw new Error('Voting is currently closed. Voting is open from 12 PM to 10 AM.');
    }

    const dateKey = getTomorrowDateKey();
    const voteRef = ref(database, `votes/${dateKey}/${userId}`);
    
    // Check if user has already voted
    const existingVote = await get(voteRef);
    if (existingVote.exists()) {
      throw new Error('You have already voted for HighTEA.');
    }

    // Cast the vote - must match Firebase rules validation
    await set(voteRef, {
      name: userName,
      email: userEmail,
      vote: voteChoice,
      timestamp: Date.now()
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getVoteCount = (callback) => {
  const dateKey = getTomorrowDateKey();
  const votesRef = ref(database, `votes/${dateKey}`);
  
  const unsubscribe = onValue(votesRef, (snapshot) => {
    const votes = snapshot.val() || {};
    const yesVotes = Object.values(votes).filter(vote => vote.vote === 'Yes');
    const noVotes = Object.values(votes).filter(vote => vote.vote === 'No');
    
    callback({
      yesCount: yesVotes.length,
      noCount: noVotes.length,
      yesVoters: yesVotes.map(vote => vote.name),
      totalVotes: Object.keys(votes).length
    });
  });

  return unsubscribe;
};

export const getUserVote = async (userId) => {
  try {
    const dateKey = getTomorrowDateKey();
    const voteRef = ref(database, `votes/${dateKey}/${userId}`);
    const snapshot = await get(voteRef);
    return snapshot.exists() ? snapshot.val().vote : null;
  } catch (error) {
    console.error('Error getting user vote:', error);
    return null;
  }
};

export const getVoteHistory = async (userId, limit = 30) => {
  try {
    const votesRef = ref(database, 'votes');
    const snapshot = await get(votesRef);
    const allVotes = snapshot.val() || {};
    
    const userVotes = [];
    Object.keys(allVotes).forEach(date => {
      if (allVotes[date][userId]) {
        userVotes.push({
          date,
          ...allVotes[date][userId]
        });
      }
    });
    
    return userVotes
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting vote history:', error);
    return [];
  }
};

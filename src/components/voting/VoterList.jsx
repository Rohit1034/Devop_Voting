import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import { formatNumber } from '../../utils/helpers';
import { MdSearch, MdCheck } from 'react-icons/md';
import './VoterList.css';

const VoterList = ({ 
  voters = [], 
  title = "Voters",
  showSearch = true 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVoters = voters.filter(voter =>
    voter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (voters.length === 0) {
    return (
      <Card className="voter-list-empty" padding="large">
        <div className="voter-list-empty-content">
          <div className="voter-list-empty-icon">🗳️</div>
          <h3>No votes yet</h3>
          <p>Be the first to vote!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="voter-list-card" padding="large">
      <div className="voter-list-header">
        <h2 className="voter-list-title">
          {title} ({formatNumber(voters.length)})
        </h2>
        
        {showSearch && voters.length > 5 && (
          <Input
            type="text"
            placeholder="Search voters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="voter-list-search"
          >
            <MdSearch />
          </Input>
        )}
      </div>

      <div className="voter-list-container-inner">
        {filteredVoters.length === 0 ? (
          <div className="voter-list-no-results">
            No voters found matching "{searchTerm}"
          </div>
        ) : (
          <div className="voter-list">
            {filteredVoters.map((voter, index) => (
              <div key={`${voter}-${index}`} className="voter-item">
                <div className="voter-number">
                  {voters.indexOf(voter) + 1}
                </div>
                <div className="voter-name">{voter}</div>
                <MdCheck className="voter-icon" />
              </div>
            ))}
          </div>
        )}
      </div>

      {searchTerm && filteredVoters.length > 0 && (
        <div className="voter-list-footer">
          Showing {formatNumber(filteredVoters.length)} of {formatNumber(voters.length)} voters
        </div>
      )}
    </Card>
  );
};

export default VoterList;

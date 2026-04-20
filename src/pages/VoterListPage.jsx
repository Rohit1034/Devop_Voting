import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVoteData } from '../hooks/useVoteData';
import { ROUTES } from '../utils/constants';
import { getTomorrowDateKey, formatDate } from '../utils/dateUtils';
import Layout from '../components/layout/Layout';
import VoterList from '../components/voting/VoterList';
import MobileNav from '../components/layout/MobileNav';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { MdArrowBack, MdDownload } from 'react-icons/md';
import './VoterListPage.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { database } from '../services/firebase';
import { ref, get } from 'firebase/database';

const VoterListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const snackDate = getTomorrowDateKey();
  const  voteData = useVoteData();
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  
  // Get voters from navigation state or hook data
  const voters = location.state?.voters || voteData.yesVoters;
  const tomorrowDate = getTomorrowDateKey();

  const handleBackClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleDownload = async () => {
  if (!fromDate || !toDate) {
    alert('Please select both From Date and To Date');
    return;
  }

  if (new Date(fromDate) > new Date(toDate)) {
    alert('From Date must be before To Date');
    return;
  }

  setLoading(true);
  try {
    const selectedFromDate = new Date(fromDate);
    const selectedToDate = new Date(toDate);
    
    // Set time to end of day for toDate to include the entire day
    selectedToDate.setHours(23, 59, 59, 999);

    const votesRef = ref(database, 'votes');
    const snapshot = await get(votesRef);
    const allVotes = snapshot.val() || {};
    
    console.log('All votes from Firebase:', allVotes);
    console.log('From Date:', fromDate);
    console.log('To Date:', toDate);

    // Filter votes for the selected date range and sort by date
    const monthlyData = [];
    const sortedDates = Object.keys(allVotes)
      .filter(date => {
        const voteDate = new Date(date + 'T00:00:00'); // Add time to avoid timezone issues
        return voteDate >= selectedFromDate && voteDate <= selectedToDate;
      })
      .sort();
    
    console.log('Filtered dates for selected range:', sortedDates);

    sortedDates.forEach(date => {
      const votes = allVotes[date];
      console.log(`Processing date ${date}:`, votes);
      
      if (votes) {
        console.log('First vote sample:', Object.entries(votes)[0]);
      }
      
      const yesVotes = Object.entries(votes)
        .filter(([_, voteData]) => voteData.vote === 'Yes');
      
      const yesCount = yesVotes.length;
      const yesVoterNames = yesVotes
        .map(([_, voteData]) => {
          console.log('Vote data object:', voteData);
          return voteData.name || voteData.userName || voteData.displayName || voteData.email || 'Unknown';
        })
        .join(', '); // Use newline instead of comma for multi-line cells

      monthlyData.push({
        Date: date,
        'Total Yes Count': yesCount,
        'Yes Voters': yesVoterNames,
      });
    }); 
    
    console.log('Final data:', monthlyData);

    if (monthlyData.length === 0) {
      alert('No data found for the selected date range');
      setLoading(false);
      return;
    }

    // Create worksheet with proper newline handling
    const wsData = [
      ['Date', 'Total Yes Count', 'Yes Voters'], // Header
      ...monthlyData.map(row => [row.Date, row['Total Yes Count'], row['Yes Voters']])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    
    // Set column widths
    worksheet['!cols'] = [
      { wch: 12 },  // Date column
      { wch: 16 },  // Total Yes Count column
      { wch: 40 },  // Yes Voters column
    ];
    
    // Set row heights and enable text wrapping for all cells
    worksheet['!rows'] = Array(wsData.length).fill({ hpx: 30 });
    
    Object.keys(worksheet).forEach(cell => {
      if (cell !== '!cols' && cell !== '!rows' && worksheet[cell].t) {
        worksheet[cell].alignment = { 
          wrapText: true, 
          vertical: 'top',
          horizontal: 'left'
        };
      }
    });
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vote Report');
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    
    saveAs(blob, `yes_vote_report_${fromDate}_to_${toDate}.xlsx`);
  } catch (err) {
    console.error(err);
    alert('Failed to generate report');
  } finally {
    setLoading(false);
  }
};


  if (loading) {
    return (
      <Layout>
        <LoadingSpinner fullScreen message="Loading voter data..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="voter-list-page">
        <div className="voter-list-container">
          {/* Date Range Picker */}
          <Card className="date-range-picker-card" padding="medium">
            <h2 className="date-range-picker-title">Download Data</h2>
            <div className="date-range-picker">
              <div className="date-input-group">
                <label htmlFor="fromDate">From Date:</label>
                <input
                  id="fromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="date-input"
                />
              </div>
              
              <div className="date-input-group">
                <label htmlFor="toDate">To Date:</label>
                <input
                  id="toDate"
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="date-input"
                />
              </div>
            </div>
            
            <button
              className="download-report-btn-full"
              onClick={handleDownload}
              disabled={!fromDate || !toDate}
              title={!fromDate || !toDate ? "Select both dates to download" : "download report"}
            >
              <MdDownload /> Download Report
            </button>
          </Card>

          {/* Simple Back Arrow Button */}
          <button
            className="back-arrow-btn"
            onClick={handleBackClick}
            title="Back to Home"
          >
            <MdArrowBack />
          </button>

          {/* Voter List */}
          <VoterList 
            voters={voters}
            title="Employees voting Yes for HighTEA"
            showSearch={true}
          />

          {/* Summary */}
          {voters.length > 0 && (
            <Card className="voter-list-summary" padding="medium">
              <div className="voter-list-summary-content">
                <div className="voter-list-summary-stat">
                  <span className="voter-list-summary-number">{voters.length}</span>
                  <span className="voter-list-summary-label">
                    {voters.length === 1 ? 'Employee wants' : 'Employees want'} HighTEA
                  </span>
                </div>
                
                <div className="voter-list-summary-total">
                  <span className="voter-list-summary-total-label">
                    Total votes {voteData.totalVotes}
                  </span>
                </div>
              </div>
            </Card>
          )}
        </div>

        <MobileNav />
      </div>
    </Layout>
  );
};

export default VoterListPage;
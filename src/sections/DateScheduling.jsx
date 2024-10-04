import React, { useState } from 'react';
import './DateScheduling.css';

const DateScheduling = ({ candidatesSubmitted, onSchedule }) => {
  const [votingDate, setVotingDate] = useState('');
  const [resultDate, setResultDate] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ voting: '', result: '' });

  const handleVotingDateChange = (e) => {
    const today = new Date().toISOString().split('T')[0];
    const selectedDate = e.target.value;
    if (selectedDate < today) {
      setErrorMessage({ ...errorMessage, voting: 'The voting date cannot be in the past.' });
    } else {
      setVotingDate(selectedDate);
      setErrorMessage({ ...errorMessage, voting: '' });
    }
  };

  const handleResultDateChange = (e) => {
    const selectedDate = e.target.value;
    const minEndTime = new Date(votingDate);
    minEndTime.setDate(minEndTime.getDate() + 1);

    if (new Date(selectedDate) < minEndTime) {
      setErrorMessage({
        ...errorMessage,
        result: 'The result date should be at least 1 day after the voting date.',
      });
    } else {
      setResultDate(selectedDate);
      setErrorMessage({ ...errorMessage, result: '' });
    }
  };

  const scheduleVoting = () => {
    console.log('Scheduling voting...'); // Debug log
    if (onSchedule) {
      console.log('Calling onSchedule with dates:', votingDate, resultDate); // Debug log
      onSchedule(votingDate, resultDate);
    }
    setIsScheduled(true);
    setTimeout(() => {
      setIsScheduled(false);
      setVotingDate('');
      setResultDate('');
    }, 3000);
  };

  return (
    <section className="date-scheduling-section" id="date-scheduling">
      <div className="scheduling-background">
        <h2 className="date-scheduling-title">Schedule Voting</h2>
        <div className="date-scheduling-card">
          {!isScheduled ? (
            <>
              <div className="date-inputs">
                <div className="date-input-group">
                  <label htmlFor="voting-date-picker">Voting Start Date</label>
                  <input
                    type="date"
                    id="voting-date-picker"
                    value={votingDate}
                    onChange={handleVotingDateChange}
                    className="date-picker"
                    disabled={!candidatesSubmitted}
                  />
                  {errorMessage.voting && <p className="error-message">{errorMessage.voting}</p>}
                </div>
                <div className="date-input-group">
                  <label htmlFor="result-date-picker">Result Announcement Date</label>
                  <input
                    type="date"
                    id="result-date-picker"
                    value={resultDate}
                    onChange={handleResultDateChange}
                    className="date-picker"
                    disabled={!candidatesSubmitted || !votingDate}
                  />
                  {errorMessage.result && <p className="error-message">{errorMessage.result}</p>}
                </div>
              </div>
              <button
                className="submit-button"
                onClick={scheduleVoting}
                disabled={!candidatesSubmitted || !votingDate || !resultDate || errorMessage.voting || errorMessage.result}
              >
                Schedule Election
              </button>
            </>
          ) : (
            <div className="success-card">
              <div className="success-icon">✓</div>
              <h3 className="success-title">Election Scheduled!</h3>
              <div className="success-details">
                <div className="success-date-item">
                  <span className="success-label">Voting Starts:</span>
                  <span className="success-value">
                    {new Date(votingDate).toLocaleDateString(undefined, 
                      { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="success-date-item">
                  <span className="success-label">Results Announced:</span>
                  <span className="success-value">
                    {new Date(resultDate).toLocaleDateString(undefined, 
                      { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DateScheduling;
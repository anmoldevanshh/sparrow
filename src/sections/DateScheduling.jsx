import React, { useState } from 'react';
import './DateScheduling.css';

const DateScheduling = ({ candidatesSubmitted }) => {
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
    minEndTime.setDate(minEndTime.getDate() + 1);  // At least 1 day after voting date

    if (new Date(selectedDate) < minEndTime) {
      setErrorMessage({
        ...errorMessage,
        result: `The result date should be at least 1 day after the voting date.`,
      });
    } else {
      setResultDate(selectedDate);
      setErrorMessage({ ...errorMessage, result: '' });
    }
  };

  const scheduleVoting = () => {
    setIsScheduled(true);
  };

  const handleCardKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!votingDate) {
        document.getElementById('voting-date-picker').focus();
      } else if (!resultDate) {
        document.getElementById('result-date-picker').focus();
      } else {
        scheduleVoting();
      }
    }
  };

  return (
    <section
      id="date-scheduling"
      className="date-scheduling-section"
      tabIndex={0}
      onKeyDown={handleCardKeyPress}
    >
      <h2 className="date-scheduling-title">Schedule Voting</h2>
      {!isScheduled ? (
        <>
          <div className="date-inputs">
            <input
              type="date"
              id="voting-date-picker"
              value={votingDate}
              onChange={handleVotingDateChange}
              className="date-picker"
              disabled={!candidatesSubmitted}
            />
            <input
              type="date"
              id="result-date-picker"
              value={resultDate}
              onChange={handleResultDateChange}
              className="date-picker"
              disabled={!candidatesSubmitted || !votingDate}
            />
          </div>
          <div className="error-messages">
            {errorMessage.voting && <p className="error-message">{errorMessage.voting}</p>}
            {errorMessage.result && <p className="error-message">{errorMessage.result}</p>}
          </div>
          <button
            className="submit-button"
            onClick={scheduleVoting}
            disabled={!candidatesSubmitted || !votingDate || !resultDate}
          >
            Submit
          </button>
        </>
      ) : (
        <div className="scheduled-info">
          <div className="info-card">
            <h3 className="info-title">Start Date</h3>
            <p className="info-content">{new Date(votingDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
          </div>
          <div className="info-card">
            <h3 className="info-title">Result Date</h3>
            <p className="info-content">{new Date(resultDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default DateScheduling;

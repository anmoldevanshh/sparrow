import React, { useState } from 'react';
import './DateScheduling.css';

const DateScheduling = ({ candidatesSubmitted }) => {
  const [votingStartDate, setVotingStartDate] = useState('');
  const [votingEndDate, setVotingEndDate] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Get the current date in YYYY-MM-DD format
  const getCurrentDate = () => new Date().toISOString().slice(0, 10);

  // Validate if the date is in the past
  const isPastDate = (date) => new Date(date) < new Date(getCurrentDate());

  // Validate if the end date is before the start date
  const isInvalidEndDate = (endDate) => new Date(endDate) <= new Date(votingStartDate);

  // Handle changes in the voting start date picker
  const handleVotingStartDateChange = (e) => {
    const selectedDate = e.target.value;

    if (isPastDate(selectedDate)) {
      setErrorMessage('The voting start date cannot be in the past.');
    } else {
      setVotingStartDate(selectedDate);
      setErrorMessage('');
    }
  };

  // Handle changes in the voting end date picker
  const handleVotingEndDateChange = (e) => {
    const selectedDate = e.target.value;

    if (isInvalidEndDate(selectedDate)) {
      setErrorMessage('The voting end date should be after the start date.');
    } else {
      setVotingEndDate(selectedDate);
      setErrorMessage('');
    }
  };

  // Function to schedule the voting after validation
  const scheduleVoting = () => {
    if (votingStartDate && votingEndDate && !errorMessage) {
      setIsScheduled(true);
    }
  };

  return (
    <section
      id="date-scheduling"
      className="date-scheduling-section"
    >
      <h2 className="date-scheduling-title">Schedule Voting</h2>
      {!isScheduled ? (
        <>
          <div className="date-inputs">
            <label htmlFor="voting-start-date-picker" className="date-picker-label">Voting Start Date</label>
            <input
              type="date"
              id="voting-start-date-picker"
              value={votingStartDate}
              onChange={handleVotingStartDateChange}
              className="date-picker"
              disabled={!candidatesSubmitted}
            />
            <label htmlFor="voting-end-date-picker" className="date-picker-label">Voting End Date</label>
            <input
              type="date"
              id="voting-end-date-picker"
              value={votingEndDate}
              onChange={handleVotingEndDateChange}
              className="date-picker"
              disabled={!candidatesSubmitted || !votingStartDate}
            />
          </div>

          {/* Error messages */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Submit button */}
          <button
            className="submit-button"
            onClick={scheduleVoting}
            disabled={!candidatesSubmitted || !votingStartDate || !votingEndDate || errorMessage}
          >
            {isScheduled ? 'Voting Scheduled' : 'Submit'}
          </button>
        </>
      ) : (
        <div className="scheduled-info">
          <div className="info-card">
            <h3 className="info-title">Voting Period</h3>
            <p className="info-description">
              From {new Date(votingStartDate).toLocaleDateString()} to {new Date(votingEndDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default DateScheduling;

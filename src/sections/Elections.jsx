import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Elections.css';

const Elections = ({ ongoingElections, onElectionSelect }) => {
  return (
    <section className="elections-section" id="elections">
      <h2 className="elections-title">Elections</h2>
      <div className="election-list">
        <AnimatePresence>
          {ongoingElections.map((election, index) => (
            <motion.div
              key={election.id || index}
              className="election-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => onElectionSelect(election)}
            >
              <div className="election-card-inner">
                <img src={election.image} alt={election.name} className="election-image" />
                <div className="election-info">
                  <div className="election-name">{election.name}</div>
                  <div className="election-dates">
                    <div className="date-item">
                      <span className="date-label">Voting:</span>
                      <span className="date-value">{new Date(election.votingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">Results:</span>
                      <span className="date-value">{new Date(election.resultDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="candidates-preview">
                    {election.candidates.slice(0, 3).map((candidate, i) => (
                      <img 
                        key={i}
                        src={candidate.image}
                        alt={`${candidate.firstName} ${candidate.lastName}`}
                        className="candidate-preview-image"
                      />
                    ))}
                    {election.candidates.length > 3 && (
                      <div className="more-candidates">+{election.candidates.length - 3}</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {ongoingElections.length === 0 && (
          <motion.div
            className="no-elections"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="no-elections-icon">🗳️</div>
            <h3>No Active Elections</h3>
            <p>Create a new election to get started!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Elections;
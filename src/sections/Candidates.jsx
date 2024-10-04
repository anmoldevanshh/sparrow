import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Candidates.css';
import defaultImage from '/src/assets/defaultImage.png';

const Candidates = ({ onSubmit, selectedElection, candidatesSubmitted, onClose }) => {
  const [candidates, setCandidates] = useState([]);
  const [candidateData, setCandidateData] = useState({ firstName: '', lastName: '', image: defaultImage });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewImage, setPreviewImage] = useState(defaultImage);
  const [errorMessage, setErrorMessage] = useState('');
  const [electionData, setElectionData] = useState({ name: '', image: defaultImage });
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [showSubmitElection, setShowSubmitElection] = useState(false);
  const [isDisplayMode, setIsDisplayMode] = useState(false);

  const candidateImageInputRef = useRef(null);
  const electionImageInputRef = useRef(null);
  const firstNameInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (selectedElection) {
      setCandidates(selectedElection.candidates || []);
      setElectionData({
        name: selectedElection.name || '',
        image: selectedElection.image || defaultImage
      });
      setIsDisplayMode(true);
    } else {
      setIsDisplayMode(false);
      if (!candidatesSubmitted) {
        resetForm();
      }
    }
  }, [selectedElection, candidatesSubmitted]);

  useEffect(() => {
    if (showAddCandidate && firstNameInputRef.current) {
      firstNameInputRef.current.focus();
    }
  }, [showAddCandidate]);

  const resetForm = () => {
    setCandidates([]);
    setCandidateData({ firstName: '', lastName: '', image: defaultImage });
    setPreviewImage(defaultImage);
    setElectionData({ name: '', image: defaultImage });
    setIsSubmitted(false);
    setShowAddCandidate(false);
    setShowSubmitElection(false);
    setErrorMessage('');
    setIsDisplayMode(false);
  };

  const handleCloseSelection = () => {
    resetForm();
    if (onClose) {
      onClose();
    }
  };

  const handleImageUpload = (event, isElectionImage = false) => {
    event.stopPropagation();
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (isElectionImage) {
        setElectionData({ ...electionData, image: imageUrl });
      } else {
        setCandidateData({ ...candidateData, image: imageUrl });
        setPreviewImage(imageUrl);
      }
    }
  };

  const handleAddCandidate = (e) => {
    e?.preventDefault();
    if (!candidateData.firstName.trim()) {
      setErrorMessage('Please enter at least a first name for the candidate.');
      return;
    }
    setCandidates([...candidates, { ...candidateData, id: Date.now() }]);
    setCandidateData({ firstName: '', lastName: '', image: defaultImage });
    setPreviewImage(defaultImage);
    setErrorMessage('');
    setShowAddCandidate(false);
  };

  const handleSubmitElection = (e) => {
    e?.preventDefault();
    if (!electionData.name.trim()) {
      setErrorMessage('Please provide an election name.');
      return;
    }
    setIsSubmitted(true);
    onSubmit({ ...electionData, candidates });
    setShowSubmitElection(false);
  };

  const handleRemoveCandidate = (index) => {
    setCandidates(candidates.filter((_, i) => i !== index));
  };

  const renderOverlay = (isAddCandidate = true) => (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => isAddCandidate ? setShowAddCandidate(false) : setShowSubmitElection(false)}
    >
      <motion.form
        ref={formRef}
        onSubmit={isAddCandidate ? handleAddCandidate : handleSubmitElection}
        className={`overlay-content ${!isAddCandidate ? 'submit-election-form' : ''}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          type="button"
          className="close-button"
          onClick={() => isAddCandidate ? setShowAddCandidate(false) : setShowSubmitElection(false)}
        >
          ×
        </button>
        <h3 className="overlay-title">{isAddCandidate ? 'Add Candidate' : 'Submit Election'}</h3>
        
        {isAddCandidate ? (
          <>
            <div className="form-group">
              <input
                ref={firstNameInputRef}
                type="text"
                placeholder="First Name"
                value={candidateData.firstName}
                onChange={e => setCandidateData({ ...candidateData, firstName: e.target.value })}
                className="candidate-name-input"
                required
              />
              <input
                type="text"
                placeholder="Last Name (Optional)"
                value={candidateData.lastName}
                onChange={e => setCandidateData({ ...candidateData, lastName: e.target.value })}
                className="candidate-name-input"
              />
            </div>
            <div className="form-group">
              <div className="image-upload-container">
                <img 
                  src={previewImage} 
                  alt="Candidate" 
                  className="image-preview"
                  onClick={() => candidateImageInputRef.current?.click()}
                />
                <div className="image-upload-text">
                  {previewImage === defaultImage ? 'Click to upload image' : 'Click to change image'}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                  ref={candidateImageInputRef}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <input
                type="text"
                placeholder="Election Name"
                value={electionData.name}
                onChange={e => setElectionData({ ...electionData, name: e.target.value })}
                className="election-name-input"
                required
              />
            </div>
            <div className="form-group">
              <div className="image-upload-container">
                <img 
                  src={electionData.image} 
                  alt="Election" 
                  className="image-preview"
                  onClick={() => electionImageInputRef.current?.click()}
                />
                <div className="image-upload-text">
                  {electionData.image === defaultImage ? 'Add election image' : 'Change election image'}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleImageUpload(e, true)}
                  hidden
                  ref={electionImageInputRef}
                />
              </div>
            </div>
          </>
        )}
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <motion.button
          type="submit"
          className={isAddCandidate ? "add-candidate-button" : "submit-election-button"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAddCandidate ? 'Add Candidate' : 'Submit Election'}
        </motion.button>
      </motion.form>
    </motion.div>
  );

  return (
    <section className="candidates-section" id="candidates">
      <div className="candidates-header">
        <h2 className="candidates-title">
          {isDisplayMode ? `Candidates for ${electionData.name}` : 'Candidates'}
        </h2>
        {isDisplayMode && (
          <motion.button
            className="close-selection-button"
            onClick={handleCloseSelection}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </motion.button>
        )}
      </div>
      <div className="candidate-list">
        <AnimatePresence>
          {candidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              className="candidate-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="candidate-card-inner">
                <img src={candidate.image} alt={`${candidate.firstName} ${candidate.lastName}`} className="candidate-image" />
                <div className="candidate-info">
                  <div className="candidate-name">
                    <div className="first-name">{candidate.firstName}</div>
                    {candidate.lastName && <div className="last-name">{candidate.lastName}</div>}
                  </div>
                  {!isDisplayMode && !isSubmitted && (
                    <button className="remove-candidate-button" onClick={() => handleRemoveCandidate(index)}>×</button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {!isDisplayMode && !isSubmitted && (
          <motion.div
            className="add-candidate-card"
            onClick={() => setShowAddCandidate(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="upload-icon">+</div>
            <div className="add-candidate-text">Add Candidate</div>
          </motion.div>
        )}
      </div>

      {candidates.length >= 2 && !isSubmitted && !isDisplayMode && (
        <motion.button
          className="submit-election-button"
          onClick={() => setShowSubmitElection(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Election
        </motion.button>
      )}

      <AnimatePresence>
        {showAddCandidate && renderOverlay(true)}
        {showSubmitElection && renderOverlay(false)}
      </AnimatePresence>
    </section>
  );
};

export default Candidates;
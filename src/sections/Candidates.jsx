import React, { useState, useRef, useEffect } from 'react';
import './Candidates.css';
import defaultImage from '/src/assets/defaultImage.png'; // Path to your default image

const Candidates = ({ onSubmit }) => {
  const [candidates, setCandidates] = useState([]);
  const [candidateData, setCandidateData] = useState({ name: '', image: defaultImage });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewImage, setPreviewImage] = useState(defaultImage);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const addCandidateCardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addCandidateCardRef.current && 
        !addCandidateCardRef.current.contains(event.target) &&
        submitButtonRef.current && 
        !submitButtonRef.current.contains(event.target)
      ) {
        // Focus on submit button if click is outside the add candidate card
        submitButtonRef.current.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddCandidate = () => {
    if (candidateData.name.trim()) {
      setCandidates([...candidates, candidateData]);
      setCandidateData({ name: '', image: defaultImage });
      setPreviewImage(defaultImage);
      inputRef.current.focus();
      setErrorMessage('');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCandidateData({ ...candidateData, image: imageUrl });
      setPreviewImage(imageUrl);
    }
  };

  const handleNameChange = (event) => {
    setCandidateData({ ...candidateData, name: event.target.value });
  };

  const handleCardClick = (event) => {
    if (!isSubmitted) {
      event.stopPropagation();
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (document.activeElement === inputRef.current) {
        handleAddCandidate();
      } else if (document.activeElement === submitButtonRef.current && candidates.length >= 2) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    if (candidates.length < 2) {
      setErrorMessage('Please add at least two candidates before submitting.');
      return;
    }
    setIsSubmitted(true);
    onSubmit();
  };

  const handleRemoveCandidate = (index) => {
    const updatedCandidates = [...candidates];
    updatedCandidates.splice(index, 1);
    setCandidates(updatedCandidates);
  };

  return (
    <section className="candidates-section" id="candidates">
      <h2 className="candidates-title">Candidates</h2>
      <div className="candidate-list">
        {candidates.map((candidate, index) => (
          <div className="candidate-card" key={index}>
            <img src={candidate.image} alt={`Candidate ${index}`} className="candidate-image" />
            <div className="candidate-name">{candidate.name}</div>
            {!isSubmitted && (
              <button 
                className="remove-candidate-button"
                onClick={() => handleRemoveCandidate(index)}
              >
                &times;
              </button>
            )}
          </div>
        ))}
        {!isSubmitted && (
          <div
            className="add-candidate-card"
            onClick={handleCardClick}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            ref={addCandidateCardRef}  // Ref added to the add candidate card
          >
            <input
              type="file"
              accept="image/*"
              className="add-image-input"
              onChange={handleImageUpload}
              hidden
              id="upload-button"
              disabled={isSubmitted}
            />
            <label
              htmlFor="upload-button"
              className="upload-icon"
              onClick={(e) => e.stopPropagation()}
            >
              +
            </label>
            <img src={previewImage} alt="Preview" className="preview-image" />
            <input
              type="text"
              className="add-candidate-input"
              placeholder="Enter Candidate Name"
              value={candidateData.name}
              onChange={handleNameChange}
              ref={inputRef}
              disabled={isSubmitted}
              onKeyDown={handleKeyDown}
            />
            <button
              className="add-candidate-button"
              onClick={handleAddCandidate}
              disabled={isSubmitted}
            >
              Add Candidate
            </button>
          </div>
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {!isSubmitted && (
        <div className="submit-container">
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={candidates.length === 0}
            ref={submitButtonRef}
            onKeyDown={handleKeyDown}
          >
            Submit Candidates
          </button>
        </div>
      )}
    </section>
  );
};

export default Candidates;

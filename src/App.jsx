import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Home from './sections/Home.jsx';
import Candidates from './sections/Candidates.jsx';
import DateScheduling from './sections/DateScheduling.jsx';
import Elections from './sections/Elections.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import './index.css';

const App = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [candidatesSubmitted, setCandidatesSubmitted] = useState(false);
    const [ongoingElections, setOngoingElections] = useState([]);
    const [currentElection, setCurrentElection] = useState(null);
    const [selectedElection, setSelectedElection] = useState(null);

    const handleWalletConnection = (status) => {
        setIsWalletConnected(status);
    };

    const handleCandidatesSubmit = (electionData) => {
        setCandidatesSubmitted(true);
        setCurrentElection(electionData);
        setSelectedElection(null);
    };

    const handleDateScheduling = (votingDate, resultDate) => {
        if (currentElection) {
            const newElection = {
                ...currentElection,
                id: Date.now(),
                votingDate,
                resultDate
            };
            setOngoingElections([...ongoingElections, newElection]);
            setCurrentElection(null);
            setCandidatesSubmitted(false);
            setSelectedElection(null);
        }
    };

    const handleElectionSelect = (election) => {
        setSelectedElection(election);
        setCandidatesSubmitted(true);
        const candidatesSection = document.getElementById('candidates');
        if (candidatesSection) {
            candidatesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleElectionClose = () => {
        setSelectedElection(null);
        setCandidatesSubmitted(false);
    };

    return (
        <>
            <Header onWalletConnect={handleWalletConnection} />
            <main>
                <Home />
                <Candidates 
                    onSubmit={handleCandidatesSubmit}                    
                    selectedElection={selectedElection}
                    candidatesSubmitted={candidatesSubmitted}
                    onClose={handleElectionClose}
                />
                <DateScheduling 
                    candidatesSubmitted={candidatesSubmitted && !selectedElection}
                    onSchedule={handleDateScheduling}
                />
                <Elections 
                    ongoingElections={ongoingElections}
                    onElectionSelect={handleElectionSelect}
                />
                <About />
            </main>
            <Footer />
        </>
    );
};

export default App;
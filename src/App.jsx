import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Home from './sections/Home.jsx';
import Candidates from './sections/Candidates.jsx';
import DateScheduling from './sections/DateScheduling.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import './index.css';

const App = () => {
    // State to track whether candidates are submitted
    const [candidatesSubmitted, setCandidatesSubmitted] = useState(false);

    // Function to handle candidate submission
    const handleCandidatesSubmit = () => {
        setCandidatesSubmitted(true);
    };

    return (
        <>
            <Header />
            <main>
                <Home />
                {/* Pass the submission handler to Candidates */}
                <Candidates onSubmit={handleCandidatesSubmit} />
                {/* Pass the candidatesSubmitted state to DateScheduling */}
                <DateScheduling candidatesSubmitted={candidatesSubmitted} />
                <About />
            </main>
            <Footer />
        </>
    );
};

export default App;

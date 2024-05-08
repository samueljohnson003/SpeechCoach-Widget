import React, { useState } from 'react';
import SpeechWidget from './components/SpeechWidget';
import './App.css';

function App() {
  const [sessionActive, setSessionActive] = useState(false);

  return (
    <div className="app">
      <header>
        <h1>Speech Coach</h1>
        <p>Practice speaking with real-time speed and clarity feedback</p>
      </header>
      <main>
        {!sessionActive ? (
          <button className="start-btn" onClick={() => setSessionActive(true)}>
            Start Practice Session
          </button>
        ) : (
          <SpeechWidget onEnd={() => setSessionActive(false)} />
        )}
      </main>
    </div>
  );
}

export default App;

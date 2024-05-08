import React, { useEffect, useState, useRef } from 'react';
import { useSpeechCoach } from '../hooks/useSpeechCoach';

export default function SpeechWidget({ onEnd }) {
  const { isListening, transcript, wpm, feedback, start, stop, reset } = useSpeechCoach();
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isListening) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isListening]);

  const speedLabel = wpm < 120 ? 'Too Slow' : wpm > 180 ? 'Too Fast' : 'Good Pace';
  const speedColor = wpm < 120 ? '#f59e0b' : wpm > 180 ? '#ef4444' : '#10b981';

  return (
    <div className="widget">
      <div className="controls">
        {!isListening ? (
          <button onClick={start}>Start Listening</button>
        ) : (
          <button onClick={stop} className="stop">Stop</button>
        )}
        <button onClick={() => { reset(); setElapsed(0); }}>Reset</button>
        <button onClick={onEnd}>End Session</button>
      </div>

      <div className="metrics">
        <div className="metric">
          <span className="label">Time</span>
          <span className="value">{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')}</span>
        </div>
        <div className="metric">
          <span className="label">Speed</span>
          <span className="value" style={{ color: speedColor }}>{wpm} WPM</span>
          <span className="badge" style={{ background: speedColor }}>{speedLabel}</span>
        </div>
      </div>

      <div className="feedback">
        <h3>Feedback</h3>
        <p>{feedback || 'Speak to receive feedback...'}</p>
      </div>

      <div className="transcript">
        <h3>Transcript</h3>
        <p>{transcript || 'Listening...'}</p>
      </div>
    </div>
  );
}

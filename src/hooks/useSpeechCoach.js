import { useState, useRef, useCallback } from 'react';

export function useSpeechCoach() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [wpm, setWpm] = useState(0);
  const [feedback, setFeedback] = useState('');
  const recognitionRef = useRef(null);
  const wordCountRef = useRef(0);
  const startTimeRef = useRef(null);

  const start = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        }
      }
      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript);
        const words = finalTranscript.trim().split(/\s+/).length;
        wordCountRef.current += words;

        const elapsedMin = (Date.now() - startTimeRef.current) / 60000;
        if (elapsedMin > 0) {
          const currentWpm = Math.round(wordCountRef.current / elapsedMin);
          setWpm(currentWpm);

          if (currentWpm < 110) setFeedback('Try speaking a bit faster for better engagement.');
          else if (currentWpm > 190) setFeedback('Slow down slightly for clearer delivery.');
          else setFeedback('Good speaking pace. Keep it natural.');
        }
      }
    };

    recognition.onerror = (e) => {
      console.error(e);
      setFeedback('Microphone error. Check permissions.');
    };

    recognitionRef.current = recognition;
    startTimeRef.current = Date.now();
    wordCountRef.current = 0;
    recognition.start();
    setIsListening(true);
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript('');
    setWpm(0);
    setFeedback('');
    wordCountRef.current = 0;
  }, []);

  return { isListening, transcript, wpm, feedback, start, stop, reset };
}

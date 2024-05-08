# Speech Coach Widget

Real-time speaking feedback tool for interview practice. Tracks speaking speed, provides clarity notes, and helps improve delivery.

## Features

- Live words-per-minute calculation
- Visual pace indicator (too slow, good, too fast)
- Clarity and filler word feedback
- Session timer and summary
- Embeddable React component

## Architecture

```
src/
├── components/     # UI widgets
├── hooks/          # Speech analysis logic
├── utils/          # Helpers
└── styles/
```

## Getting Started

```bash
npm install
npm run dev
```

Allow microphone access and begin speaking.

## Usage

The core is designed to be reusable:

```jsx
import SpeechWidget from './components/SpeechWidget';

<SpeechWidget onSessionEnd={(summary) => console.log(summary)} />
```

## Roadmap

- [x] Real-time WPM
- [x] Visual feedback
- [x] Session tracking
- [ ] Filler word detection
- [ ] Export reports

MIT License

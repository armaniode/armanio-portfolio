import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Resolve the fonts before mounting text or starting the heavier project media.
// A bounded wait keeps the portfolio usable if a font request fails or stalls.
async function start() {
  if (document.fonts) {
    let timer;
    await Promise.race([
      Promise.allSettled([
        document.fonts.load('400 22px "Just Me Again Down Here"', 'Telegram It’s in progress. Coming soon…'),
        document.fonts.load('400 40px "Inter Variable"', 'Design leader'),
        document.fonts.load('400 16px "Inter"', 'Portfolio'),
      ]),
      new Promise(resolve => { timer = setTimeout(resolve, 3000); }),
    ]);
    clearTimeout(timer);
  }
  createRoot(document.getElementById('root')).render(<App />);
}
start();

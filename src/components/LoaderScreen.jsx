import { useEffect, useRef } from 'react';
import './LoaderScreen.css';

const LoaderScreen = ({ onSkip, animateOut }) => {
  const ref = useRef(null);

  // Allow skip with Enter or Space
  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        onSkip();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSkip]);

  return (
    <div ref={ref} className={'loader-screen' + (animateOut ? ' hide' : '')} aria-label="Жүктеу">
      <div className="loader-frame">
        <div className="title-line">
          <span className="pixel-mark">✦</span> KOK ASPAN
        </div>
        <div className="loading-bar">
          <div className="fill" />
          <div className="scan" />
        </div>
        <div className="tip">PRESS ENTER TO SKIP</div>
        <div className="ornament">
          <div className="pattern p1" />
          <div className="pattern p2" />
          <div className="pattern p3" />
        </div>
      </div>
      <button type="button" className="skip-btn" onClick={onSkip}>Skip ▶</button>
    </div>
  );
};

export default LoaderScreen;

import { useState } from 'react';
import './PixelClicker.css';

const achievements = [
  { count: 1, text: 'Тамаша бастама!' },
  { count: 10, text: 'Жолдан тайма' },
  { count: 50, text: 'Сенің қолыңнан келеді!' },
  { count: 70, text: 'Мүмкін, жетер?' },
  { count: 100, text: 'Бәлкім, тоқтаған дұрыс шығар?' },
  { count: 111, text: 'Жарайсың! Сен жеңдің — енді ойынан шық.' }
];

const PixelClicker = () => {
  const [score, setScore] = useState(0);
  const [unlocked, setUnlocked] = useState([]);
  const [currentMsg, setCurrentMsg] = useState('');

  const handleClick = () => {
    const newScore = score + 1;
    setScore(newScore);
    const found = achievements.find(a => a.count === newScore);
    if (found && !unlocked.includes(found.count)) {
      setUnlocked([...unlocked, found.count]);
      setCurrentMsg(found.text);
      setTimeout(() => setCurrentMsg(''), 2500);
    }
  };

  const finished = score >= 123;

  return (
    <main className={finished ? "pixel-clicker section container finished-mode" : "pixel-clicker section container"}>
      {!finished && <h2 className="gradient-text">Pixel Clicker</h2>}
      {!finished && <p className="muted">Кликай по пиксельному кубику и набирай очки!</p>}
      <div className="clicker-area">
        {!finished && (
          <button className="pixel-btn" onClick={handleClick}>
            <span role="img" aria-label="pixel">🟪</span>
          </button>
        )}
        {!finished && <div className="score">Очки: {score}</div>}
        {currentMsg && !finished && (
          <div className="achievement-toast">{currentMsg}</div>
        )}
        {finished && (
          <div className="pixel-finish big">
            <img src="/projects_pixel_gif/mini-game-id-1.gif" alt="finish gif" className="finish-gif big" />
            <div className="finish-text big">Мен сенімен мақтанамын. Ойынға қатысқаның үшін рахмет!</div>
          </div>
        )}
      </div>
    </main>
  );
};

export default PixelClicker;

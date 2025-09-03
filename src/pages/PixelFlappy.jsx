import { useRef, useEffect, useState } from 'react';
import './PixelFlappy.css';

const GAME_W = 320;
const GAME_H = 480;
const GRAVITY = 0.22;
const FLAP = -5;
const PIPE_GAP = 100;
const PIPE_W = 48;
const PIPE_SPEED = 2;

function getRandomY() {
  return Math.floor(Math.random() * (GAME_H - PIPE_GAP - 80)) + 40;
}

const PixelFlappy = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(null);
  const [unlocked, setUnlocked] = useState([]);
  const [currentMsg, setCurrentMsg] = useState('');

  const achievements = [
    { count: 1, text: 'Бәрі осылай басталды... және осылай аяқталды.' },
    { count: 2, text: 'Сен адамсын ба?' },
    { count: 5, text: 'Мен сенің күшіңді мойындаймын.' },
    { count: 10, text: 'Жарайсың! Бірақ сен күн сәулесінің не екенін білесің бе?' }
  ];
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const bird = useRef({ x: 60, y: GAME_H/2, vy: 0 });
  const pipes = useRef([]);

  useEffect(() => {
    let anim;
    if (started && !gameOver) {
      anim = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(anim);
    // eslint-disable-next-line
  }, [started, gameOver]);

  const resetGame = () => {
    bird.current = { x: 60, y: GAME_H/2, vy: 0 };
    pipes.current = [{ x: GAME_W, y: getRandomY() }];
    setScore(0);
    setFinalScore(null);
    setGameOver(false);
    setStarted(false);
    draw();
  };

  const flap = () => {
    if (!started) setStarted(true);
    if (!gameOver) bird.current.vy = FLAP;
  };

  const gameLoop = () => {
    // Bird physics
    bird.current.vy += GRAVITY;
    bird.current.y += bird.current.vy;
    // Pipes
    pipes.current.forEach(pipe => pipe.x -= PIPE_SPEED);
    if (pipes.current.length === 0 || pipes.current[pipes.current.length-1].x < GAME_W - 180) {
      pipes.current.push({ x: GAME_W, y: getRandomY() });
    }
    if (pipes.current[0].x < -PIPE_W) pipes.current.shift();
    // Collision
    const b = bird.current;
    for (let pipe of pipes.current) {
      if (
        b.x + 24 > pipe.x && b.x < pipe.x + PIPE_W &&
        (b.y < pipe.y || b.y + 24 > pipe.y + PIPE_GAP)
      ) {
        setGameOver(true);
        setFinalScore(score);
        return;
      }
    }
    if (b.y < 0 || b.y + 24 > GAME_H) {
      setGameOver(true);
      setFinalScore(score);
      return;
    }
    // Score
    pipes.current.forEach(pipe => {
      if (!pipe.passed && pipe.x + PIPE_W < b.x) {
        pipe.passed = true;
        setScore(s => {
          const newScore = s + 1;
          const found = achievements.find(a => a.count === newScore);
          if (found && !unlocked.includes(found.count)) {
            setUnlocked(prev => [...prev, found.count]);
            setCurrentMsg(found.text);
            setTimeout(() => setCurrentMsg(''), 2500);
          }
          return newScore;
        });
      }
    });
  draw();
  if (!gameOver) requestAnimationFrame(gameLoop);
  };

  const draw = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0,0,GAME_W,GAME_H);
    // Gradient background (steppe night)
    const grad = ctx.createLinearGradient(0,0,0,GAME_H);
    grad.addColorStop(0, '#1a2233');
    grad.addColorStop(1, '#111');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,GAME_W,GAME_H);

    // Pipes: dark, with runes
    pipes.current.forEach(pipe => {
      ctx.fillStyle = '#222';
      ctx.fillRect(pipe.x, 0, PIPE_W, pipe.y);
      ctx.fillRect(pipe.x, pipe.y + PIPE_GAP, PIPE_W, GAME_H - pipe.y - PIPE_GAP);
      // Draw runes (simple white lines)
      ctx.save();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        // Top pipe rune
        ctx.beginPath();
        ctx.moveTo(pipe.x + 8 + i*12, pipe.y - 18);
        ctx.lineTo(pipe.x + 16 + i*12, pipe.y - 6);
        ctx.stroke();
        // Bottom pipe rune
        ctx.beginPath();
        ctx.moveTo(pipe.x + 8 + i*12, pipe.y + PIPE_GAP + 6);
        ctx.lineTo(pipe.x + 16 + i*12, pipe.y + PIPE_GAP + 18);
        ctx.stroke();
      }
      // Pixel vines (green)
      ctx.strokeStyle = '#2ecc40';
      ctx.lineWidth = 3;
      // Top pipe vines
      for (let v = 0; v < 2; v++) {
        ctx.beginPath();
        ctx.moveTo(pipe.x + 6 + v*30, pipe.y - 4);
        ctx.lineTo(pipe.x + 10 + v*30, pipe.y + 12);
        ctx.lineTo(pipe.x + 14 + v*30, pipe.y + 6);
        ctx.stroke();
        // Leaves
        ctx.fillStyle = '#27ae60';
        ctx.fillRect(pipe.x + 10 + v*30, pipe.y + 12, 4, 4);
      }
      // Bottom pipe vines
      for (let v = 0; v < 2; v++) {
        ctx.beginPath();
        ctx.moveTo(pipe.x + 6 + v*30, pipe.y + PIPE_GAP + 4);
        ctx.lineTo(pipe.x + 10 + v*30, pipe.y + PIPE_GAP + 24);
        ctx.lineTo(pipe.x + 14 + v*30, pipe.y + PIPE_GAP + 16);
        ctx.stroke();
        ctx.fillStyle = '#27ae60';
        ctx.fillRect(pipe.x + 10 + v*30, pipe.y + PIPE_GAP + 24, 4, 4);
      }
      // Pixel cracks (black)
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 2;
      // Top pipe cracks
      ctx.beginPath();
      ctx.moveTo(pipe.x + 20, pipe.y - 10);
      ctx.lineTo(pipe.x + 24, pipe.y - 2);
      ctx.lineTo(pipe.x + 28, pipe.y - 8);
      ctx.stroke();
      // Bottom pipe cracks
      ctx.beginPath();
      ctx.moveTo(pipe.x + 20, pipe.y + PIPE_GAP + 10);
      ctx.lineTo(pipe.x + 24, pipe.y + PIPE_GAP + 18);
      ctx.lineTo(pipe.x + 28, pipe.y + PIPE_GAP + 12);
      ctx.stroke();
      ctx.restore();
    });

    // Bird: pixel eagle (berkut)
    const bx = bird.current.x, by = bird.current.y;
    // Body
    ctx.fillStyle = '#a67c52'; // brown
    ctx.fillRect(bx+4, by+8, 16, 12);
    // Head
    ctx.fillStyle = '#fff';
    ctx.fillRect(bx+14, by+6, 6, 6);
    // Beak
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(bx+19, by+8, 4, 3);
    // Wings
    ctx.fillStyle = '#a67c52';
    ctx.fillRect(bx, by+10, 24, 4);
    // Eye
    ctx.fillStyle = '#222';
    ctx.fillRect(bx+18, by+8, 2, 2);
    // Tail
    ctx.fillStyle = '#fff';
    ctx.fillRect(bx+4, by+18, 4, 4);

  // Score (bright yellow with dark outline)
  ctx.font = 'bold 32px monospace';
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#222';
  ctx.strokeText(gameOver && finalScore !== null ? finalScore : score, 16, 44);
  ctx.fillStyle = '#ffd700';
  ctx.fillText(gameOver && finalScore !== null ? finalScore : score, 16, 44);
  };

  useEffect(() => {
    draw();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handle = (e) => {
      if (e.code === 'Space' || e.button === 0) flap();
    };
    window.addEventListener('keydown', handle);
    window.addEventListener('mousedown', handle);
    return () => {
      window.removeEventListener('keydown', handle);
      window.removeEventListener('mousedown', handle);
    };
  }, [started, gameOver]);

  return (
    <main className="pixel-flappy section container">
      <h2 className="gradient-text">Pixel Flappy</h2>
      <p className="muted">Нажимай пробел или кликай, чтобы лететь. Пройди как можно дальше!</p>
      <div className="flappy-area">
        <canvas ref={canvasRef} width={GAME_W} height={GAME_H} className="flappy-canvas" />
        {currentMsg && (
          <div className="achievement-toast">{currentMsg}</div>
        )}
        <div className="flappy-controls">
          {!started && !gameOver && <button className="flappy-btn" onClick={flap}>Старт</button>}
          {gameOver && <>
            <div className="flappy-final-score">Ваш результат: {finalScore}</div>
            <button className="flappy-btn" onClick={resetGame}>Заново</button>
          </>}
        </div>
      </div>
    </main>
  );
};

export default PixelFlappy;

import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PixelBatyrRunner.css';

const GAME_W = 480;
const GAME_H = 180;
const GROUND_Y = GAME_H - 32;
const GRAVITY = 0.38;
const JUMP = -10;
const ENEMY_W = 24;
const ENEMY_H = 32;
const BATYR_W = 48;
const BATYR_H = 32;

function getRandomGap() {
  return 260 + Math.floor(Math.random() * 120);
}

const PixelBatyrRunner = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(null);
  const [started, setStarted] = useState(false);
  const batyr = useRef({ x: 40, y: GROUND_Y, vy: 0, jumping: false });
  const enemies = useRef([{ x: GAME_W + 60, y: GROUND_Y }]);
  const navigate = useNavigate();

  useEffect(() => {
    let anim;
    if (started && !gameOver) {
      anim = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(anim);
    // eslint-disable-next-line
  }, [started, gameOver]);

  const resetGame = () => {
    batyr.current = { x: 40, y: GROUND_Y, vy: 0, jumping: false };
    enemies.current = [{ x: GAME_W + 60, y: GROUND_Y }];
    setScore(0);
    setFinalScore(null);
    setGameOver(false);
    setStarted(false);
    draw();
  };

  const jump = () => {
    if (!started) setStarted(true);
    if (!gameOver && !batyr.current.jumping) {
      batyr.current.vy = JUMP;
      batyr.current.jumping = true;
    }
  };

  const gameLoop = () => {
    batyr.current.vy += GRAVITY;
    batyr.current.y += batyr.current.vy;
    if (batyr.current.y >= GROUND_Y) {
      batyr.current.y = GROUND_Y;
      batyr.current.vy = 0;
      batyr.current.jumping = false;
    }
    enemies.current.forEach(enemy => enemy.x -= 2.2);
    if (enemies.current.length === 0 || enemies.current[enemies.current.length-1].x < GAME_W - getRandomGap()) {
      enemies.current.push({ x: GAME_W + 60, y: GROUND_Y });
    }
    if (enemies.current[0].x + ENEMY_W < batyr.current.x) enemies.current.shift();
    // Collision
    const b = batyr.current;
    for (let enemy of enemies.current) {
      if (
        b.x + BATYR_W > enemy.x && b.x < enemy.x + ENEMY_W &&
        b.y + BATYR_H > enemy.y
      ) {
        setGameOver(true);
        setFinalScore(score);
        return;
      }
    }
    // Score
    enemies.current.forEach(enemy => {
      if (!enemy.passed && enemy.x + ENEMY_W < b.x) {
        enemy.passed = true;
        setScore(s => s + 1);
      }
    });
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
  };

  const draw = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0,0,GAME_W,GAME_H);
    // Day background: sky gradient
    const grad = ctx.createLinearGradient(0,0,0,GAME_H);
    grad.addColorStop(0, '#aee9ff');
    grad.addColorStop(0.7, '#e6e2b6');
    grad.addColorStop(1, '#c2b280');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,GAME_W,GAME_H);
    // Clouds
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(60 + i*120, 30 + i*10, 18, 0, Math.PI*2);
      ctx.arc(80 + i*120, 32 + i*10, 12, 0, Math.PI*2);
      ctx.arc(70 + i*120, 24 + i*10, 10, 0, Math.PI*2);
      ctx.fill();
    }
    // Steppe (grass)
    ctx.fillStyle = '#b6d47a';
    ctx.fillRect(0,GROUND_Y+BATYR_H-8,GAME_W,12);
    // Ground line
    ctx.fillStyle = '#a67c52';
    ctx.fillRect(0,GROUND_Y+BATYR_H+4,GAME_W,6);
    // Batyr on horse (pixel art, more details)
    const bx = batyr.current.x, by = batyr.current.y;
    ctx.fillStyle = '#a67c52';
    ctx.fillRect(bx+8, by+16, 32, 12);
    ctx.fillStyle = '#222';
    ctx.fillRect(bx+4, by+22, 6, 6);
    ctx.fillStyle = '#a67c52';
    ctx.fillRect(bx+10, by+28, 8, 4);
    ctx.fillRect(bx+30, by+28, 8, 4);
    ctx.fillStyle = '#222';
    ctx.fillRect(bx+10, by+31, 8, 2);
    ctx.fillRect(bx+30, by+31, 8, 2);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(bx+32, by+20, 8, 2);
    ctx.fillStyle = '#222';
    ctx.fillRect(bx+20, by+4, 10, 12);
    ctx.fillStyle = '#fff';
    ctx.fillRect(bx+24, by, 6, 6);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(bx+24, by, 6, 3);
    ctx.fillStyle = '#b6d47a';
    ctx.fillRect(bx+18, by+8, 4, 8);
    // Enemy (pixel monster, more details)
    enemies.current.forEach(enemy => {
      ctx.fillStyle = '#333';
      ctx.fillRect(enemy.x, enemy.y, ENEMY_W, ENEMY_H);
      ctx.fillStyle = '#fff';
      ctx.fillRect(enemy.x+6, enemy.y+8, 4, 4);
      ctx.fillRect(enemy.x+14, enemy.y+8, 4, 4);
      ctx.fillStyle = '#a00';
      ctx.fillRect(enemy.x+4, enemy.y+18, 16, 8);
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(enemy.x+2, enemy.y+2, 4, 8);
      ctx.fillRect(enemy.x+18, enemy.y+2, 4, 8);
      ctx.fillStyle = '#fff';
      ctx.fillRect(enemy.x+8, enemy.y+26, 8, 2);
    });
    // Score
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#ffd700';
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 3;
    ctx.strokeText(gameOver && finalScore !== null ? finalScore : score, 16, 40);
    ctx.fillText(gameOver && finalScore !== null ? finalScore : score, 16, 40);
  };

  useEffect(() => {
    draw();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handle = (e) => {
      if (e.code === 'Space' || e.button === 0) jump();
    };
    window.addEventListener('keydown', handle);
    window.addEventListener('mousedown', handle);
    return () => {
      window.removeEventListener('keydown', handle);
      window.removeEventListener('mousedown', handle);
    };
  }, [started, gameOver]);

  if (gameOver) {
    return (
      <main className="pixel-batyr-runner section container gameover-mode">
        <div className="batyr-achievement big">Сен алдандың. Ойын бұзылған.</div>
        <div className="batyr-gif-block big">
          <img src="/projects_pixel_gif/mini-game-id-4.gif" alt="game over gif" className="batyr-gif big" />
        </div>
        <button className="batyr-back-btn" onClick={() => navigate('/minigames')}>Назад к мини-играм</button>
      </main>
    );
  }

  return (
    <main className="pixel-batyr-runner section container">
      <h2 className="gradient-text">Pixel Batyr Runner</h2>
      <p className="muted">Нажимай пробел или кликай, чтобы прыгать. Перепрыгивай врагов и набирай очки!</p>
      <div className="batyr-area">
        <canvas ref={canvasRef} width={GAME_W} height={GAME_H} className="batyr-canvas" />
        <div className="batyr-controls">
          {!started && <button className="batyr-btn" onClick={jump}>Старт</button>}
        </div>
      </div>
    </main>
  );
};

export default PixelBatyrRunner;

import { useState, useEffect } from 'react';
import './Pixel2048.css';

const SIZE = 4;
function getEmptyBoard() {
  return Array(SIZE).fill().map(() => Array(SIZE).fill(0));
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function addRandom(board) {
  const empty = [];
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if (!board[r][c]) empty.push([r, c]);
  if (empty.length === 0) return board;
  const [r, c] = empty[getRandomInt(empty.length)];
  board[r][c] = Math.random() < 0.9 ? 2 : 4;
  return board;
}
function clone(board) {
  return board.map(row => [...row]);
}
function slide(row) {
  let arr = row.filter(v => v);
  for (let i = 0; i < arr.length-1; i++) {
    if (arr[i] === arr[i+1]) {
      arr[i] *= 2;
      arr[i+1] = 0;
    }
  }
  arr = arr.filter(v => v);
  while (arr.length < SIZE) arr.push(0);
  return arr;
}
function rotate(board) {
  const newBoard = getEmptyBoard();
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) newBoard[c][SIZE-1-r] = board[r][c];
  return newBoard;
}

const Pixel2048 = () => {
  const [board, setBoard] = useState(() => addRandom(addRandom(getEmptyBoard())));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [unlocked, setUnlocked] = useState([]);
  const [currentMsg, setCurrentMsg] = useState('');

  const achievements = [
    { count: 1, text: 'О тамаша бастама!' },
    { count: 22, text: 'Алға бас — сенің қолыңнан бәрі келеді!' },
    { count: 55, text: 'Саған шынымен қызық па?' },
    { count: 69, text: 'Мен өте қуаныштымын.' },
    { count: 111, text: 'Мүмкін, скрин жасап, маған  жіберсең 🙂' },
    { count: 200, text: '«Адам — өз заманының перзенті. Егер ол жаман болса, оған кінәлі — оның замандастары.»\n— Абай Құнанбайұлы' }
  ];

  useEffect(() => {
    const handle = (e) => {
      if (gameOver) return;
      let moved = false;
      let newBoard = clone(board);
      if (e.key === 'ArrowLeft') {
        newBoard = newBoard.map(slide);
        moved = true;
      } else if (e.key === 'ArrowRight') {
        newBoard = newBoard.map(row => slide(row.reverse()).reverse());
        moved = true;
      } else if (e.key === 'ArrowUp') {
        newBoard = rotate(newBoard);
        newBoard = newBoard.map(slide);
        newBoard = rotate(rotate(rotate(newBoard)));
        moved = true;
      } else if (e.key === 'ArrowDown') {
        newBoard = rotate(newBoard);
        newBoard = newBoard.map(row => slide(row.reverse()).reverse());
        newBoard = rotate(rotate(rotate(newBoard)));
        moved = true;
      }
      if (moved) {
        if (JSON.stringify(board) !== JSON.stringify(newBoard)) {
          setBoard(addRandom(newBoard));
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
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [board, gameOver]);

  useEffect(() => {
    // Check for game over
    let moves = 0;
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        if (!board[r][c]) moves++;
        if (r < SIZE-1 && board[r][c] === board[r+1][c]) moves++;
        if (c < SIZE-1 && board[r][c] === board[r][c+1]) moves++;
      }
    }
    if (moves === 0) setGameOver(true);
  }, [board]);

  const reset = () => {
    setBoard(addRandom(addRandom(getEmptyBoard())));
    setScore(0);
    setGameOver(false);
  };

  return (
    <main className="pixel-2048 section container">
      <h2 className="gradient-text">Pixel 2048</h2>
      <p className="muted">Соединяй одинаковые плитки, чтобы получить 2048!</p>
      <div className="board">
        {board.map((row, r) => (
          <div className="row" key={r}>
            {row.map((cell, c) => (
              <div className={"cell cell-"+cell} key={c}>{cell ? cell : ''}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="score">Очки: {score}</div>
      {currentMsg && (
        <div className="achievement-toast">{currentMsg}</div>
      )}
      {gameOver && <div className="gameover">Игра окончена! <button onClick={reset}>Заново</button></div>}
    </main>
  );
};

export default Pixel2048;

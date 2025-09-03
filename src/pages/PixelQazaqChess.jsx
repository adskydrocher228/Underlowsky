import { useState, useRef } from "react";
import './PixelQazaqChess.css';

// Базовая разметка шахматной доски и фигур
const initialBoard = [
  // 8x8 массив: строки сверху вниз
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bi', color: 'black' },
    { type: 'khan', color: 'black' },
    { type: 'batyr', color: 'black' },
    { type: 'bi', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' }
  ],
  Array(8).fill({ type: 'pawn', color: 'black' }),
  ...Array(4).fill(Array(8).fill(null)),
  Array(8).fill({ type: 'pawn', color: 'white' }),
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bi', color: 'white' },
    { type: 'khan', color: 'white' },
    { type: 'batyr', color: 'white' },
    { type: 'bi', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' }
  ]
];

const difficulties = [
  { label: 'Легко', value: 'easy' },
  { label: 'Средне', value: 'medium' },
  { label: 'Сложно', value: 'hard' }
];
const sides = [
  { label: 'Белые', value: 'white' },
  { label: 'Чёрные', value: 'black' },
  { label: 'Рандом', value: 'random' }
];

function getValidMoves(board, from, turn) {
  // board: 8x8, from: [i,j], turn: 'white'|'black'
  const piece = board[from[0]][from[1]];
  if (!piece || piece.color !== turn) return [];
  const moves = [];
  // Реализуем правила для каждой фигуры
  if (piece.type === 'pawn') {
    const dir = piece.color === 'white' ? -1 : 1;
    const [i, j] = from;
    if (board[i + dir] && !board[i + dir][j]) moves.push([i + dir, j]);
    // атака по диагонали
    [j - 1, j + 1].forEach(j2 => {
      if (board[i + dir] && board[i + dir][j2] && board[i + dir][j2]?.color !== piece.color) moves.push([i + dir, j2]);
    });
  }
  if (piece.type === 'rook') {
    // горизонталь и вертикаль
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([di,dj]) => {
      for (let k=1;k<8;k++) {
        const ni=i+di*k,nj=j+dj*k;
        if (ni<0||ni>7||nj<0||nj>7) break;
        if (!board[ni][nj]) moves.push([ni,nj]);
        else {
          if (board[ni][nj].color!==piece.color) moves.push([ni,nj]);
          break;
        }
      }
    });
  }
  if (piece.type === 'knight') {
    [[-2,-1],[-2,1],[2,-1],[2,1],[-1,-2],[-1,2],[1,-2],[1,2]].forEach(([di,dj]) => {
      const ni=i+di,nj=j+dj;
      if (ni>=0&&ni<8&&nj>=0&&nj<8&&(!board[ni][nj]||board[ni][nj].color!==piece.color)) moves.push([ni,nj]);
    });
  }
  if (piece.type === 'bi') {
    // диагонали
    [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([di,dj]) => {
      for (let k=1;k<8;k++) {
        const ni=i+di*k,nj=j+dj*k;
        if (ni<0||ni>7||nj<0||nj>7) break;
        if (!board[ni][nj]) moves.push([ni,nj]);
        else {
          if (board[ni][nj].color!==piece.color) moves.push([ni,nj]);
          break;
        }
      }
    });
  }
  if (piece.type === 'batyr') {
    // ферзь: все направления
    [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([di,dj]) => {
      for (let k=1;k<8;k++) {
        const ni=i+di*k,nj=j+dj*k;
        if (ni<0||ni>7||nj<0||nj>7) break;
        if (!board[ni][nj]) moves.push([ni,nj]);
        else {
          if (board[ni][nj].color!==piece.color) moves.push([ni,nj]);
          break;
        }
      }
    });
  }
  if (piece.type === 'khan') {
    // король: 1 клетка в любую сторону
    [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([di,dj]) => {
      const ni=i+di,nj=j+dj;
      if (ni>=0&&ni<8&&nj>=0&&nj<8&&(!board[ni][nj]||board[ni][nj].color!==piece.color)) moves.push([ni,nj]);
    });
  }
  return moves;
}

export default function PixelQazaqChess() {
  const [mode, setMode] = useState(null); // 'pvp' | 'bot'
  const [difficulty, setDifficulty] = useState(null);
  const [side, setSide] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(initialBoard.map(row=>row.map(cell=>cell?{...cell}:null)));
  const [turn, setTurn] = useState('white');
  const [selected, setSelected] = useState(null); // [i,j]
  const [validMoves, setValidMoves] = useState([]);
  const animRef = useRef(null);

  // Базовая разметка шахматной доски и фигур
  const initialBoard = [
    // 8x8 массив: строки сверху вниз
    [
      { type: 'rook', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'bi', color: 'black' },
      { type: 'khan', color: 'black' },
      { type: 'batyr', color: 'black' },
      { type: 'bi', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'rook', color: 'black' }
    ],
    Array(8).fill({ type: 'pawn', color: 'black' }),
    ...Array(4).fill(Array(8).fill(null)),
    Array(8).fill({ type: 'pawn', color: 'white' }),
    [
      { type: 'rook', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'bi', color: 'white' },
      { type: 'khan', color: 'white' },
      { type: 'batyr', color: 'white' },
      { type: 'bi', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'rook', color: 'white' }
    ]
  ];

  function renderPiece(piece) {
    if (!piece) return null;
    if (piece.type === 'khan') return <span className="chess-piece khan {piece.color}">♔</span>;
    if (piece.type === 'batyr') return <span className="chess-piece batyr {piece.color}">♚</span>;
    if (piece.type === 'bi') return <span className="chess-piece bi {piece.color}">♝</span>;
    if (piece.type === 'rook') return <span className={`chess-piece ${piece.color}`}>♜</span>;
    if (piece.type === 'knight') return <span className={`chess-piece ${piece.color}`}>♞</span>;
    if (piece.type === 'pawn') return <span className={`chess-piece ${piece.color}`}>♟</span>;
    return null;
  }

  // Выбор режима
  if (!mode) {
    return (
      <div className="chess-setup">
        <h2 className="chess-title">Pixel Qazaq Chess</h2>
        <button className="chess-btn" onClick={() => setMode('pvp')}>2 игрока</button>
        <button className="chess-btn" onClick={() => setMode('bot')}>Против компьютера</button>
      </div>
    );
  }

  // 2 игрока — сразу старт
  if (mode === 'pvp' && !gameStarted) {
    setGameStarted(true);
  }

  // Против бота — выбор сложности
  if (mode === 'bot' && !difficulty) {
    return (
      <div className="chess-setup">
        <h2 className="chess-title">Выберите сложность</h2>
        {difficulties.map(d => (
          <button key={d.value} className="chess-btn" onClick={() => setDifficulty(d.value)}>{d.label}</button>
        ))}
      </div>
    );
  }

  // Против бота — выбор стороны
  if (mode === 'bot' && difficulty && !side) {
    return (
      <div className="chess-setup">
        <h2 className="chess-title">Выберите сторону</h2>
        {sides.map(s => (
          <button key={s.value} className="chess-btn" onClick={() => setSide(s.value)}>{s.label}</button>
        ))}
      </div>
    );
  }

  // Партия началась
  if (gameStarted) {
    return (
      <div className="chess-game">
        <div className="chess-board">
          {board.map((row, i) =>
            row.map((cell, j) => {
              const isSelected = selected && selected[0] === i && selected[1] === j;
              const isValid = validMoves.some(([vi,vj])=>vi===i&&vj===j);
              return (
                <div
                  key={i + '-' + j}
                  className={`chess-cell${(i + j) % 2 ? ' dark' : ''}${isSelected ? ' selected' : ''}${isValid ? ' valid' : ''}`}
                  onClick={() => {
                    if (selected) {
                      if (isValid) {
                        // Анимация перемещения
                        animRef.current = {from: selected, to: [i,j], piece: board[selected[0]][selected[1]]};
                        setTimeout(()=>{
                          const newBoard = board.map(row=>row.slice());
                          newBoard[i][j] = board[selected[0]][selected[1]];
                          newBoard[selected[0]][selected[1]] = null;
                          setBoard(newBoard);
                          setSelected(null);
                          setValidMoves([]);
                          setTurn(turn==='white'?'black':'white');
                          animRef.current = null;
                        }, 200);
                      } else {
                        setSelected(null);
                        setValidMoves([]);
                      }
                    } else if (cell && cell.color === turn) {
                      setSelected([i,j]);
                      setValidMoves(getValidMoves(board, [i,j], turn));
                    }
                  }}
                >
                  {renderPiece(cell)}
                  {/* Анимация: можно добавить SVG или CSS эффекты */}
                </div>
              );
            })
          )}
        </div>
        <div style={{textAlign:'center',marginTop:'1rem'}}>
          Ход: <b>{turn === 'white' ? 'Ақ' : 'Көк'}</b>
        </div>
      </div>
    );
  }

  // ...управление ходами, статус партии...
  return (
    <div className="chess-game">
      <div className="chess-board">
        {initialBoard.map((row, i) =>
          row.map((cell, j) => (
            <div key={i + '-' + j} className={`chess-cell${(i + j) % 2 ? ' dark' : ''}`}>{renderPiece(cell)}</div>
          ))
        )}
      </div>
      <h3>Партия началась!</h3>
      <p>Режим: {mode === 'pvp' ? '2 игрока' : 'Против компьютера'}<br/>
        {mode === 'bot' && `Сложность: ${difficulty}, Сторона: ${side}`}
      </p>
    </div>
  );
}

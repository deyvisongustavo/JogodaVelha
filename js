import React from 'react';
import './App.css';

// Quadrado individual
function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

// Tabuleiro com 9 quadrados
function Board({ squares, onPlay, xIsNext }) {
  const winner = calculateWinner(squares);
  const nextValue = xIsNext ? "X" : "O";

  const status = winner
    ? `Vencedor: ${winner}`
    : `Próximo jogador: ${nextValue}`;

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = nextValue;
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        {[0, 1, 2].map(i => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>

      <div className="board-row">
        {[3, 4, 5].map(i => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>

      <div className="board-row">
        {[6, 7, 8].map(i => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>
    </>
  );
}

// Componente principal do jogo
export default function Game() {
  const [history, setHistory] = React.useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = React.useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      nextSquares
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((_, move) => {
    const description =
      move ? `Ir para jogada #${move}` : "Início do jogo";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares}
          onPlay={handlePlay}
          xIsNext={xIsNext}
        />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Lógica para descobrir o ganhador
function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a,b,c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

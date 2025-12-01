<!-- Jogo da Velha Completo em um único arquivo HTML (HTML + CSS + JavaScript) -->
<!-- Estrutura simples, ideal para estudantes iniciantes -->

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Jogo da Velha</title>

  <!-- CSS: responsável por deixar o layout organizado e bonito -->
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f6f6f8;
      margin: 0;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      margin-bottom: 10px;
    }

    #status {
      font-size: 20px;
      margin-bottom: 15px;
      font-weight: bold;
    }

    #board {
      display: grid;
      grid-template-columns: repeat(3, 80px);
      gap: 8px;
    }

    .square {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border: 2px solid #ccc;
      border-radius: 8px;
      font-size: 32px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.1s;
    }

    .square:active {
      transform: scale(0.95);
    }

    #history {
      margin-top: 20px;
    }

    #history button {
      display: block;
      margin-bottom: 8px;
      padding: 6px 10px;
      cursor: pointer;
      border-radius: 6px;
      border: 1px solid #ddd;
      background: #fff;
    }

    #reset {
      margin-top: 15px;
      padding: 8px 15px;
      border-radius: 6px;
      border: none;
      background: #444;
      color: white;
      cursor: pointer;
    }
  </style>
</head>

<body>
  <h1>Jogo da Velha</h1>
  <div id="status">Próximo jogador: X</div>

  <!-- Tabuleiro do jogo -->
  <div id="board"></div>

  <!-- Histórico de jogadas -->
  <div id="history"></div>

  <!-- Botão para reiniciar -->
  <button id="reset">Reiniciar Jogo</button>

  <!-- JavaScript: Lógica do jogo, eventos e atualizações -->
  <script>
    let history = [Array(9).fill(null)];
    let currentMove = 0;

    const statusDiv = document.getElementById("status");
    const boardDiv = document.getElementById("board");
    const historyDiv = document.getElementById("history");
    const resetBtn = document.getElementById("reset");

    function renderBoard() {
      boardDiv.innerHTML = "";
      const squares = history[currentMove];

      squares.forEach((value, i) => {
        const btn = document.createElement("div");
        btn.className = "square";
        btn.textContent = value;
        btn.onclick = () => handleClick(i);
        boardDiv.appendChild(btn);
      });

      updateStatus();
      renderHistory();
    }

    function handleClick(i) {
      const squares = history[currentMove];
      if (squares[i] || calculateWinner(squares)) return;

      const nextSquares = squares.slice();
      nextSquares[i] = currentMove % 2 === 0 ? "X" : "O";

      history = [...history.slice(0, currentMove + 1), nextSquares];
      currentMove++;
      renderBoard();
    }

    function updateStatus() {
      const squares = history[currentMove];
      const winner = calculateWinner(squares);

      if (winner) statusDiv.textContent = "Vencedor: " + winner;
      else if (squares.every(Boolean)) statusDiv.textContent = "Empate!";
      else statusDiv.textContent = "Próximo jogador: " + (currentMove % 2 === 0 ? "X" : "O");
    }

    function renderHistory() {
      historyDiv.innerHTML = "<h3>Histórico</h3>";

      history.forEach((_, move) => {
        const btn = document.createElement("button");
        btn.textContent = move ? "Ir para jogada #" + move : "Início do jogo";
        btn.onclick = () => {
          currentMove = move;
          renderBoard();
        };
        historyDiv.appendChild(btn);
      });
    }

    function calculateWinner(squares) {
      const lines = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];
      for (let [a,b,c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }

    resetBtn.onclick = () => {
      history = [Array(9).fill(null)];
      currentMove = 0;
      renderBoard();
    };

    renderBoard();
  </script>
</body>
</html>

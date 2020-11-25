(function game() {
  //module
  const Gameboard = (() => {
    let gameboard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    return { gameboard };
  })();
  //factory
  const PlayerFactory = (player, selection) => {
    return { player, selection };
  };
  //players
  const player = PlayerFactory("player", "O");
  const computer = PlayerFactory("computer", "X");
  //variables
  let activePlayer = computer;
  let container = document.getElementById("content");
  let board = Gameboard.gameboard;

  //display the initial gameboard
  (function displayGameBoard() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let square = document.createElement("div");
        square.setAttribute("class", "div-square");
        square.innerHTML = board[i][j];
        square.setAttribute("id", [i, j]);
        square.addEventListener("click", () => {
          playerTurn();
        });
        container.appendChild(square);
      }
    }
  })()
  //Scores for the minimax
  let scores = {
    X: 10,
    O: -10,
    tie: 0,
  };
  computerTurn();
  //player plays
  function playerTurn() {
    if (activePlayer == player) {
      let id = event.target.id;
      let square = document.getElementById(id);
      let num1 = id[0];
      let num2 = id[2];
      if (board[num1][num2] == "") {
        board[num1][num2] = player.selection;
        square.innerHTML = player.selection;
        activePlayer = computer;
        computerTurn(board);
      }
    }
  }
  //computer plays
  function computerTurn() {
    if (activePlayer == computer) {
      let bestScore = -Infinity;
      let move = {};
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "") {
            board[i][j] = computer.selection;
            let result = checkWinner();
            if( result != null){
              alert("Computer Win")
            }
            let score = minimax(board, 0, false);
            board[i][j] = "";
            if (score > bestScore) {
              bestScore = score;
              move = { i, j };
            }
          }
        }
      }
      board[move.i][move.j] = computer.selection;
      let square = document.getElementById(move.i + ","+move.j);
      square.innerHTML = computer.selection;
      activePlayer = player;
    }
  }


  //win conditions
  function match3(a, b, c) {
    return a == b && b == c && a != '';
  }
  
  function checkWinner() {
    let winner = null;
    //check for 3 consecutive
    // horizontal
    for (let i = 0; i < 3; i++) {
      if (match3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      }
    }
  
    // Vertical
    for (let i = 0; i < 3; i++) {
      if (match3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }
  
    // Diagonal
    if (match3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (match3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }
    //check for empty spaces in the array
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          openSpots++;
        }
      }
    }
    //if board is full and no winner = tie! else tie!
    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }
  //The famous minimax
  function minimax(board, depth, isMaximizing) {
    //if winner get the score ex: scores[x] or scores[o]
    let result = checkWinner();
    if (result !== null) {
      return scores[result];
    }
  //if computer turn aka getting the max score
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // check for available spot
          if (board[i][j] == '') {
            board[i][j] = computer.selection;
            //let the recursion begin
            let score = minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = player.selection;
            let score = minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }


})();

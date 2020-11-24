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
  //variables
  const player = PlayerFactory("player", "O");
  const computer = PlayerFactory("computer", "X");
  let activePlayer = player;
  let container = document.getElementById("content");
  let winner = false;
  //display the initial gameboard
  function displayGameBoard(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let square = document.createElement("div");
        square.setAttribute("class", "div-square");
        square.innerHTML = board[i][j];
        square.setAttribute("id", [i, j]);
        square.addEventListener("click", () => {
          playerTurn(board);
        });
        container.appendChild(square);
      }
    }
  }
  displayGameBoard(Gameboard.gameboard);
  //player plays
  function playerTurn(board) {
    if (activePlayer == player && winner == false) {
      let id = event.target.id;
      let square = document.getElementById(id);
      let num1 = id[0];
      let num2 = id[2];
      if (board[num1][num2] == "") {
        board[num1][num2] = player.selection;
        square.innerHTML = player.selection;
        activePlayer = computer;
        checkWinner(board, player);
        computerTurn(board);
      }
    }
  }
  //computer plays
  function computerTurn(board) {
    if (activePlayer == computer && winner == false) {
      let available = availableIndex(board);
      let randomIndex = Math.floor(Math.random() * available.length);
      let getIndex = available[randomIndex];
      let square = document.getElementById(getIndex.i + "," + getIndex.j);
      square.innerHTML = computer.selection;
      board[getIndex.i][getIndex.j] = computer.selection;
      checkWinner(board, computer);
      activePlayer = player;
      console.log(board);
    }
  }
  //check for free spots
  function availableIndex(board) {
    let available = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          available.push({ i, j });
        }
      }
    }
    return available;
  }
  //win conditions
  function checkWinner(board, player) {
    let available = availableIndex(board);
    //check for Tie
    if (available.length == 0) {
      alert("tie");
      return (winner = true);
    }
    //HORIZONTAL
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] == player.selection &&
        board[i][0] == board[i][1] &&
        board[i][1] == board[i][2]
      ) {
        alert(`${player.player} WINS`);
        return (winner = true);
      }
    }
    //VERTICAL
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] == player.selection &&
        board[0][i] == board[1][i] &&
        board[1][i] == board[2][i]
      ) {
        alert(`${player.player} WINS`);
        return (winner = true);
      }
    }
    //DIAGONAL
    for (let i = 0; i < 3; i++) {
      if (
        board[0][0] == player.selection &&
        board[0][0] == board[1][1] &&
        board[1][1] == board[2][2]
      ) {
        alert(`${player.player} WINS`);
        return (winner = true);
      }
    }
    //DIAGONAL
    for (let i = 0; i < 3; i++) {
      if (
        board[0][2] == player.selection &&
        board[0][2] == board[1][1] &&
        board[1][1] == board[2][0]
      ) {
        alert(`${player.player} WINS`);
        return (winner = true);
      }
    }
  }
})();

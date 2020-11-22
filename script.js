(function game() {
  let playerTurn = 0;
  //module
  const Gameboard = (() => {
    let gameboard = new Array(9).fill("");

    return { gameboard };
  })();

  //factory
  const PlayerFactory = (player, selection) => {
    return { player, selection };
  };

  const player = PlayerFactory("player", "x");
  const computer = PlayerFactory("computer", "o");

  //display gameboard
  function displayGameboard(board) {
    let contenDiv = document.getElementById("content");
    let boardContainer = document.createElement("div");
    boardContainer.setAttribute("class", "board-container");

    for (let i = 0; i < board.length; i++) {
      let divSquare = document.createElement("div");
      divSquare.setAttribute("id", i);
      divSquare.setAttribute("class", "div-square");
      divSquare.addEventListener("click", () => {
        playerPlay(board);
      });
      boardContainer.appendChild(divSquare);
    }
    contenDiv.appendChild(boardContainer);
  }

  displayGameboard(Gameboard.gameboard);

  //game logic
  function playerPlay(board) {
    let id = event.target.id;
    let clickedDiv = document.getElementById(id);
    if (clickedDiv.innerHTML == "" && playerTurn == 0) {
      clickedDiv.innerHTML = player.selection;
      board.splice(id, 1, player.selection);
      playerTurn = 1;
      checkWinner(player.selection, board);
      setTimeout(() => {
        computerPlay(board);
      }, 1000);
    }
  }
  //NOT WORKING PROPERLY, will keep generating number after full array
  function computerPlay(board) {
    if (board.some((e) => e === "")) {
      let id = Math.floor(Math.random() * 9);
      let clickedDiv = document.getElementById(id);
      while (clickedDiv.innerHTML != "") {
        let id = Math.floor(Math.random() * 9);
        clickedDiv = document.getElementById(id);
      }
      clickedDiv.innerHTML = computer.selection;
      board.splice(id, 1, computer.selection);
      checkWinner(computer.selection, board)
      playerTurn = 0;
    } else console.log("all taken");
  }

  function checkWinner(selection, board) {
    const vertical = [0, 3, 6].map((i) => {
      return [i, i + 1, i + 2];
    });
    const horitzontal = [0, 1, 2].map((i) => {
      return [i, i + 3, i + 6];
    });
    const diagonal = [
      [0, 4, 8],
      [2, 4, 6],
    ];
    const winnerArr = [].concat(vertical).concat(horitzontal).concat(diagonal);
    let result = winnerArr.some((e) => {
      return (
        board[e[0]] == selection &&
        board[e[1]] == selection &&
        board[e[2]] == selection
      );
    });
    if (result) {
      alert("WIN");
    }
  }
})();

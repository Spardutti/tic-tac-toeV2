(function game() {
  //module
  const Gameboard = (() => {
    let gameboard = new Array(9);

    return { gameboard };
  })();

  //factory
  const PlayerFactory = (player, selection) => {
    return { player, selection };
  };

  const player = PlayerFactory("player", "x");
  const computer = PlayerFactory("computer", "o");

  displayGameboard(Gameboard.gameboard, player, computer);

})();
//display gameboard
function displayGameboard(board, player, computer) {
  let contenDiv = document.getElementById("content");
  let boardContainer = document.createElement("div");
  boardContainer.setAttribute("class", "board-container");

  for (let i = 0; i < board.length; i++) {
    let divSquare = document.createElement("div");
    divSquare.setAttribute("id", i);
    divSquare.setAttribute("class", "div-square");
    divSquare.addEventListener("click", () => {
      playGame(player, computer);
    });
    boardContainer.appendChild(divSquare);
  }
  contenDiv.appendChild(boardContainer);
}
//game logic
function playGame(player, computer) {
  let turn = player;
  let id = event.target.id;
  let clickedDiv = document.getElementById(id);
  if (clickedDiv.innerHTML == "") {
    clickedDiv.innerHTML = turn.selection;
    turn = computer
  } else {
    console.log("next");
  }
}

const cells =
  document.querySelectorAll(".cell");

const statusText =
  document.getElementById("status");

const restartBtn =
  document.getElementById("restartBtn");

let currentPlayer = "X";

let gameActive = true;

let board = [
  "", "", "",
  "", "", "",
  "", "", ""
];

const winningCombinations = [

  [0,1,2],
  [3,4,5],
  [6,7,8],

  [0,3,6],
  [1,4,7],
  [2,5,8],

  [0,4,8],
  [2,4,6]

];

// CELL CLICK
cells.forEach(cell => {

  cell.addEventListener(
    "click",
    handleClick
  );

});

function handleClick(){

  const index =
    this.dataset.index;

  // Ignore occupied cells
  if(
    board[index] !== "" ||
    !gameActive
  ){
    return;
  }

  board[index] = currentPlayer;

  this.textContent =
    currentPlayer;

  this.classList.add(
    currentPlayer.toLowerCase()
  );

  checkWinner();

}

// CHECK WINNER
function checkWinner(){

  let winner = false;

  winningCombinations.forEach(combo => {

    const [a,b,c] = combo;

    if(
      board[a] &&
      board[a] === board[b] &&
      board[b] === board[c]
    ){
      winner = true;
    }

  });

  if(winner){

    statusText.textContent =
      `🎉 Player ${currentPlayer} Wins!`;

    gameActive = false;

    return;
  }

  // DRAW
  if(!board.includes("")){

    statusText.textContent =
      "🤝 It's a Draw!";

    gameActive = false;

    return;
  }

  // SWITCH PLAYER
  currentPlayer =
    currentPlayer === "X"
    ? "O"
    : "X";

  statusText.textContent =
    `Player ${currentPlayer}'s Turn`;

}

// RESTART
restartBtn.addEventListener(
  "click",
  restartGame
);

function restartGame(){

  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  currentPlayer = "X";

  gameActive = true;

  statusText.textContent =
    "Player X's Turn";

  cells.forEach(cell => {

    cell.textContent = "";

    cell.classList.remove(
      "x",
      "o"
    );

  });

}

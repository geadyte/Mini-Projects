const colors = [
  "green",
  "red",
  "yellow",
  "blue"
];

const buttons =
  document.querySelectorAll(".btn");

const startBtn =
  document.getElementById("startBtn");

const statusText =
  document.getElementById("status");

const levelText =
  document.getElementById("level");

let gameSequence = [];
let playerSequence = [];
let level = 0;
let playing = false;

// START GAME
startBtn.addEventListener("click", () => {

  level = 0;
  gameSequence = [];
  playerSequence = [];
  playing = true;

  nextRound();

});

// NEXT LEVEL
function nextRound(){

  playerSequence = [];

  level++;

  levelText.textContent = level;

  statusText.textContent =
    "Watch the sequence...";

  const randomColor =
    colors[
      Math.floor(Math.random() * colors.length)
    ];

  gameSequence.push(randomColor);

  playSequence();

}

// PLAY COMPUTER SEQUENCE
function playSequence(){

  let i = 0;

  const interval =
    setInterval(() => {

      flashButton(
        gameSequence[i]
      );

      i++;

      if(i >= gameSequence.length){
        clearInterval(interval);

        statusText.textContent =
          "Your turn!";
      }

    }, 700);

}

// FLASH BUTTON
function flashButton(color){

  const btn =
    document.querySelector(
      `[data-color="${color}"]`
    );

  btn.classList.add("active");

  setTimeout(() => {
    btn.classList.remove("active");
  }, 350);

}

// PLAYER CLICK
buttons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      if(!playing) return;

      const color =
        button.dataset.color;

      flashButton(color);

      playerSequence.push(color);

      checkMove(
        playerSequence.length - 1
      );

    }
  );

});

// CHECK PLAYER INPUT
function checkMove(index){

  if(
    playerSequence[index] !==
    gameSequence[index]
  ){

    statusText.textContent =
      "❌ Game Over!";

    playing = false;

    return;
  }

  // ROUND COMPLETE
  if(
    playerSequence.length ===
    gameSequence.length
  ){

    statusText.textContent =
      "✅ Correct!";

    setTimeout(() => {
      nextRound();
    }, 1000);

  }

}

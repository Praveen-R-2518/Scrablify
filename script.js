const moves = [
  { player: "Robot", word: "AXIS", points: 21, state: "Placing AXIS", arm: "Column 5", tile: "Gripping X", scan: "Move Validated" },
  { player: "Human", word: "GEAR", points: 17, state: "Waiting", arm: "Home", tile: "Idle", scan: "Board Clear" },
  { player: "Robot", word: "QUIZ", points: 32, state: "Calculating", arm: "Tile Rack", tile: "Selecting Q", scan: "Scanning Board" },
  { player: "Human", word: "WIRE", points: 15, state: "Ready", arm: "Home", tile: "Idle", scan: "Human Move Read" },
];

let moveIndex = 0;
let humanScore = 84;
let robotScore = 78;
let isHumanTurn = true;

const humanScoreElement = document.querySelector("#humanScore");
const robotScoreElement = document.querySelector("#robotScore");
const turnStatusElement = document.querySelector("#turnStatus");
const robotStateElement = document.querySelector("#robotState");
const armPositionElement = document.querySelector("#armPosition");
const tilePickupElement = document.querySelector("#tilePickup");
const cameraScanElement = document.querySelector("#cameraScan");
const movesListElement = document.querySelector("#movesList");
const simulateMoveButton = document.querySelector("#simulateMove");

function addMoveToList(move) {
  const item = document.createElement("li");
  item.innerHTML = `<strong>${move.player}</strong> placed ${move.word} for ${move.points} points.`;
  movesListElement.prepend(item);

  while (movesListElement.children.length > 5) {
    movesListElement.lastElementChild.remove();
  }
}

function updateDashboard() {
  const move = moves[moveIndex];

  if (move.player === "Human") {
    humanScore += move.points;
  } else {
    robotScore += move.points;
  }

  isHumanTurn = !isHumanTurn;
  humanScoreElement.textContent = humanScore;
  robotScoreElement.textContent = robotScore;
  turnStatusElement.textContent = isHumanTurn ? "Human Turn" : "Robot Turn";
  robotStateElement.textContent = move.state;
  armPositionElement.textContent = move.arm;
  tilePickupElement.textContent = move.tile;
  cameraScanElement.textContent = move.scan;

  addMoveToList(move);
  moveIndex = (moveIndex + 1) % moves.length;
}

simulateMoveButton.addEventListener("click", updateDashboard);

const ROCK = "Rock";
const PAPER = "Paper";
const SCISSORS = "Scissors";
const DEFAULT_USER_CHOICE = ROCK;

const startGameBtn = document.querySelector("#start-game-btn");

const getPlayerChoice = function () {
  const selection = prompt(`${ROCK}, ${PAPER} ${SCISSORS}`, "");
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid Choice! We give you default ${DEFAULT_USER_CHOICE}`);
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};

const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return ROCK;
    } else if (randomValue < 0.67) {
        return PAPER;        
    } else {
        return SCISSORS;
    }
};

const getWinner = (player, computer) => {
    if (player === computer) {
        return 'draw';
    } else if (
        player === ROCK && computer === SCISSORS ||
        player === SCISSORS && computer === PAPER ||
        player === PAPER && computer === ROCK ) {
            return 'player win';
    } else {
        return 'computer win';
    }
}

startGameBtn.addEventListener("click", getPlayerChoice);

// =======================
// VENOM TIC TAC TOE
// =======================

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const gameMode = document.getElementById("gameMode");
const difficulty = document.getElementById("difficulty");
const difficultyBox = document.getElementById("difficultyBox");

const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");
const versus = document.getElementById("versus");

const restartBtn = document.getElementById("restartBtn");
const newGameBtn = document.getElementById("newGameBtn");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let running = true;

let xWins = 0;
let oWins = 0;
let draws = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

gameMode.addEventListener("change", changeMode);
restartBtn.addEventListener("click", restartRound);
newGameBtn.addEventListener("click", newGame);

cells.forEach(cell=>{
    cell.addEventListener("click", cellClicked);
});

changeMode();

function changeMode() {

    if (gameMode.value === "ai") {

        difficultyBox.style.display = "block";

        playerO.value = "🤖 AI";
        playerO.readOnly = true;

        versus.textContent = "VS 🤖 AI";

    } else {

        difficultyBox.style.display = "none";

        playerO.readOnly = false;

        if (playerO.value === "🤖 AI")
            playerO.value = "Player O";

        versus.textContent = "Player X VS Player O";

    }

    newGame();
}

function cellClicked() {

    const index = this.dataset.index;

    if (!running) return;

    if (board[index] !== "") return;

    board[index] = currentPlayer;

    this.textContent = currentPlayer;

    this.classList.add(currentPlayer.toLowerCase());

    checkWinner();

    if (!running) return;

    if (gameMode.value === "ai" && currentPlayer === "O") {

        setTimeout(aiMove, 350);

    }

}

function switchPlayer() {

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    const name =
        currentPlayer === "X"
        ? playerX.value
        : playerO.value;

    statusText.textContent =
        name + "'s Turn";

}

function aiMove() {

    if (!running) return;

    let empty = [];

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "")
            empty.push(i);

    }

    if (empty.length === 0) return;

    let move =
        empty[Math.floor(Math.random() * empty.length)];

    board[move] = "O";

    cells[move].textContent = "O";
    cells[move].classList.add("o");

    checkWinner();

}

function checkWinner() {

    let winner = null;

    for (const pattern of winPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            winner = board[a];

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            break;

        }

    }

    if (winner) {

        running = false;

        if (winner === "X") {

            xWins++;
            scoreX.textContent = xWins;

            statusText.textContent =
                playerX.value + " Wins!";

        } else {

            oWins++;
            scoreO.textContent = oWins;

            statusText.textContent =
                playerO.value + " Wins!";

        }

        return;

    }

    if (!board.includes("")) {

        running = false;

        draws++;
        scoreDraw.textContent = draws;

        statusText.textContent = "Draw!";

        return;

    }

    switchPlayer();

}

function restartRound() {

    board = ["","","","","","","","",""];

    running = true;

    currentPlayer = "X";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("win");

    });

    statusText.textContent =
        playerX.value + "'s Turn";

}

function newGame() {

    xWins = 0;
    oWins = 0;
    draws = 0;

    scoreX.textContent = 0;
    scoreO.textContent = 0;
    scoreDraw.textContent = 0;

    restartRound();

}

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const modeSelect = document.getElementById("mode");
const difficultySelect = document.getElementById("difficulty");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const drawScore = document.getElementById("drawScore");

const nameX = document.getElementById("nameX");
const nameO = document.getElementById("nameO");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = true;

let scores = {
    X: 0,
    O: 0,
    draw: 0
};

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

startGame();

function startGame(){

    cells.forEach(cell=>{
        cell.addEventListener("click", cellClicked);
    });

    restartBtn.addEventListener("click", restartGame);

    updateNames();

    statusText.textContent = `${nameX.textContent}'s Turn`;

}

function updateNames(){

    nameX.textContent =
        playerXInput.value.trim() || "Player X";

    if(modeSelect.value==="ai"){
        nameO.textContent="AI";
    }else{
        nameO.textContent=
        playerOInput.value.trim() || "Player O";
    }

}
function cellClicked() {

    const index = this.dataset.index;

    if (board[index] !== "" || !gameRunning) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();

    if (
        gameRunning &&
        modeSelect.value === "ai" &&
        currentPlayer === "O"
    ) {
        setTimeout(aiMove, 400);
    }
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        currentPlayer === "X"
        ? `${nameX.textContent}'s Turn`
        : `${nameO.textContent}'s Turn`;
}

function checkWinner() {

    let roundWon = false;

    for (const pattern of winPatterns) {

        const [a,b,c] = pattern;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            roundWon = true;

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            break;
        }
    }

    if (roundWon) {

        gameRunning = false;

        if (currentPlayer === "X") {
            scores.X++;
            scoreX.textContent = scores.X;
        } else {
            scores.O++;
            scoreO.textContent = scores.O;
        }

        statusText.textContent =
            `${currentPlayer === "X" ? nameX.textContent : nameO.textContent} Wins!`;

        return;
    }

    if (!board.includes("")) {

        gameRunning = false;

        scores.draw++;
        drawScore.textContent = scores.draw;

        statusText.textContent = "It's a Draw!";

        return;
    }

    changePlayer();
}

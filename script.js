// VENOM TIC TAC TOE
// SCRIPT.JS PART 1/4

let size = 3;

let board = [];
let currentPlayer = "X";
let running = true;

let xWins = 0;
let oWins = 0;
let draws = 0;

const HUMAN = "X";
const AI = "O";

let cells;

const gameMode = document.getElementById("gameMode");
const difficulty = document.getElementById("difficulty");
const difficultyBox = document.getElementById("difficultyBox");
const boardSize = document.getElementById("boardSize");

const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");
const versus = document.getElementById("versus");

const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");
const newGameBtn = document.getElementById("newGameBtn");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");


gameMode.addEventListener("change", changeMode);
boardSize.addEventListener("change", changeBoardSize);

restartBtn.addEventListener("click", restartRound);
newGameBtn.addEventListener("click", newGame);


function createBoard(){

    const gameBoard = document.getElementById("gameBoard");

    gameBoard.innerHTML = "";

    for(let i = 0; i < size * size; i++){

        let cell = document.createElement("div");

        cell.classList.add("cell");
        cell.dataset.index = i;

        gameBoard.appendChild(cell);

    }


    cells = document.querySelectorAll(".cell");


    cells.forEach(cell=>{
        cell.addEventListener("click", cellClicked);
    });

}

function changeBoardSize(){

    size = Number(boardSize.value);

    createBoard();

    restartRound();

}


function changeMode(){

    if(gameMode.value === "ai"){

        difficultyBox.style.display = "block";

        playerO.value = "🤖 AI";
        playerO.readOnly = true;

        versus.textContent = "VS 🤖 AI";

    }else{

        difficultyBox.style.display = "none";

        if(playerO.value === "🤖 AI"){
            playerO.value = "Player O";
        }

        playerO.readOnly = false;

        versus.textContent = "Player X VS Player O";

    }

    restartRound();

}


function cellClicked(){

    let index = this.dataset.index;


    if(!running) return;

    if(board[index] !== "") return;


    makeMove(index,currentPlayer);


    if(
        gameMode.value === "ai" &&
        running &&
        currentPlayer === AI
    ){

        setTimeout(aiMove,400);

    }

}


function makeMove(index,player){

    board[index] = player;

    cells[index].textContent = player;

    cells[index].classList.add(player.toLowerCase());


    checkWinner();


    if(running){

        currentPlayer =
        currentPlayer === "X" ? "O" : "X";


        statusText.textContent =
        currentPlayer === "X"
        ? playerX.value + "'s Turn"
        : playerO.value + "'s Turn";

    }

}

function generateWinPatterns(){

    let patterns = [];


    // rows
    for(let r = 0; r < size; r++){

        let row = [];

        for(let c = 0; c < size; c++){

            row.push(r * size + c);

        }

        patterns.push(row);

    }



    // columns
    for(let c = 0; c < size; c++){

        let column = [];

        for(let r = 0; r < size; r++){

            column.push(r * size + c);

        }

        patterns.push(column);

    }



    // diagonal 1

    let diag1 = [];

    for(let i = 0; i < size; i++){

        diag1.push(i * size + i);

    }

    patterns.push(diag1);



    // diagonal 2

    let diag2 = [];

    for(let i = 0; i < size; i++){

        diag2.push(i * size + (size - 1 - i));

    }

    patterns.push(diag2);



    return patterns;

}



function checkWinner(){

    let patterns = generateWinPatterns();


    for(let pattern of patterns){

        let first = board[pattern[0]];


        if(first !== ""){

            let win = pattern.every(
                index => board[index] === first
            );


            if(win){

                running = false;


                if(first === "X"){

                    xWins++;

                    scoreX.textContent = xWins;

                    statusText.textContent =
                    playerX.value + " Wins!";

                }else{

                    oWins++;

                    scoreO.textContent = oWins;

                    statusText.textContent =
                    playerO.value + " Wins!";

                }

                return;

            }

        }

    }



    if(!board.includes("")){

        running = false;

        draws++;

        scoreDraw.textContent = draws;

        statusText.textContent = "Draw!";

    }

}



function restartRound(){

    board = Array(size * size).fill("");

    running = true;

    currentPlayer = "X";


    cells.forEach(cell=>{

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("win");

    });


    statusText.textContent =
    playerX.value + "'s Turn";

}

function aiMove(){

    let empty = [];

    for(let i = 0; i < board.length; i++){

        if(board[i] === ""){

            empty.push(i);

        }

    }


    if(empty.length === 0) return;


    let move;


    if(difficulty.value === "easy"){

        move = empty[
            Math.floor(Math.random() * empty.length)
        ];

    }


    else if(difficulty.value === "medium"){

        move = findBestMove();


        if(move === undefined){

            move = empty[
                Math.floor(Math.random() * empty.length)
            ];

        }

    }


    else{

        move = findBestMove();


        if(move === undefined){

            move = empty[
                Math.floor(Math.random() * empty.length)
            ];

        }

    }


    makeMove(move,"O");

}



function findBestMove(){

    // simple AI attack + block

    for(let i = 0; i < board.length; i++){

        if(board[i] === ""){

            board[i] = "O";

            if(isWinning("O")){

                board[i] = "";

                return i;

            }

            board[i] = "";

        }

    }



    for(let i = 0; i < board.length; i++){

        if(board[i] === ""){

            board[i] = "X";

            if(isWinning("X")){

                board[i] = "";

                return i;

            }

            board[i] = "";

        }

    }

}



function isWinning(player){

    let patterns = generateWin


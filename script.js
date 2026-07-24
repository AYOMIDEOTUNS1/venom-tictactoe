// VENOM TIC TAC TOE
// SCRIPT.JS

let size = 3;
let board = [];
let currentPlayer = "X";
let running = true;

let xWins = 0;
let oWins = 0;
let draws = 0;

let cells;

const HUMAN = "X";
const AI = "O";

const gameBoard = document.getElementById("gameBoard");

const gameMode = document.getElementById("gameMode");
const difficulty = document.getElementById("difficulty");
const difficultyBox = document.getElementById("difficultyBox");
const boardSize = document.getElementById("boardSize");

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

    gameBoard.innerHTML = "";

    board = [];

    for(let i = 0; i < size * size; i++){

        board.push("");

        let cell = document.createElement("div");

        cell.classList.add("cell");
        cell.dataset.index = i;

        cell.addEventListener("click", cellClicked);

        gameBoard.appendChild(cell);
    }

    cells = document.querySelectorAll(".cell");
}


function changeBoardSize(){

    size = Number(boardSize.value);

    restartRound();
}


function changeMode(){

    if(gameMode.value === "AI"){
        difficultyBox.style.display = "block";
    }else{
        difficultyBox.style.display = "none";
    }

    restartRound();
}

function cellClicked(){

    let index = this.dataset.index;

    if(board[index] !== "" || !running){
        return;
    }

    board[index] = currentPlayer;

    this.textContent = currentPlayer;


    if(checkWinner()){

        if(currentPlayer === "X"){
            xWins++;
            scoreX.textContent = xWins;
        }else{
            oWins++;
            scoreO.textContent = oWins;
        }

        statusText.textContent = currentPlayer + " Wins!";
        running = false;
        return;
    }


    if(!board.includes("")){

        draws++;
        scoreDraw.textContent = draws;

        statusText.textContent = "Draw!";
        running = false;
        return;
    }


    currentPlayer =
    currentPlayer === "X" ? "O" : "X";


    if(currentPlayer === AI && gameMode.value === "AI"){
        setTimeout(aiMove,500);
    }
}


function checkWinner(){

    for(let i=0;i<size;i++){

        let row = [];

        for(let j=0;j<size;j++){
            row.push(board[i*size+j]);
        }

        if(row.every(v=>v!=="" && v===row[0])){
            return true;
        }
    }


    for(let i=0;i<size;i++){

        let col=[];

        for(let j=0;j<size;j++){
            col.push(board[j*size+i]);
        }

        if(col.every(v=>v!=="" && v===col[0])){
            return true;
        }
    }


    let diag1=[];
    let diag2=[];


    for(let i=0;i<size;i++){

        diag1.push(board[i*size+i]);
        diag2.push(board[i*size+(size-i-1)]);
    }


    return (
        diag1.every(v=>v!=="" && v===diag1[0]) ||
        diag2.every(v=>v!=="" && v===diag2[0])
    );
}

function aiMove(){

    let empty = [];

    board.forEach((v,i)=>{
        if(v===""){
            empty.push(i);
        }
    });


    if(empty.length===0) return;


    let move;


    if(difficulty.value==="easy"){

        move = empty[Math.floor(Math.random()*empty.length)];

    }else{

        move = empty[Math.floor(Math.random()*empty.length)];

    }


    board[move] = AI;

    cells[move].textContent = AI;


    if(checkWinner()){

        oWins++;
        scoreO.textContent=oWins;

        statusText.textContent="O Wins!";
        running=false;

        return;
    }


    currentPlayer="X";
}


function restartRound(){

    currentPlayer="X";
    running=true;

    statusText.textContent="Your Turn";

    createBoard();
}


function newGame(){

    xWins=0;
    oWins=0;
    draws=0;

    scoreX.textContent=0;
    scoreO.textContent=0;
    scoreDraw.textContent=0;

    restartRound();
}


createBoard();


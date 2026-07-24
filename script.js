// VENOM TIC TAC TOE
// script.js
// PART 1 OF 4

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

const HUMAN = "X";
const AI = "O";

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

function changeMode(){

    if(gameMode.value==="ai"){

        difficultyBox.style.display="block";
        playerO.value="🤖 AI";
        playerO.readOnly=true;
        versus.textContent="VS 🤖 AI";

    }else{

        difficultyBox.style.display="none";

        if(playerO.value==="🤖 AI"){
            playerO.value="Player O";
        }

        playerO.readOnly=false;
        versus.textContent="Player X VS Player O";
    }

    newGame();
}

function cellClicked(){

    const index=this.dataset.index;

    if(!running) return;
    if(board[index]!="") return;

    makeMove(index,currentPlayer);

    if(
        gameMode.value==="ai" &&
        running &&
        currentPlayer===AI
    ){
        setTimeout(aiMove,300);
    }

}

function makeMove(index,player){

    board[index]=player;

    cells[index].textContent=player;
    cells[index].classList.add(player.toLowerCase());

    checkWinner();

    if(running){
        currentPlayer=currentPlayer==="X"?"O":"X";

        statusText.textContent=
            (currentPlayer==="X"
            ?playerX.value
            :playerO.value)
            +"'s Turn";
    }

}

// PART 2 OF 4
// AI SYSTEM

function aiMove(){

    if(!running) return;

    let move;

    if(difficulty.value==="easy"){

        move=randomMove();

    } 
    else if(difficulty.value==="medium"){

        move=Math.random()<0.5
        ? bestMove()
        : randomMove();

    }
    else if(
        difficulty.value==="hard" ||
        difficulty.value==="impossible"
    ){

        move=bestMove();

    }
    else{

        move=randomMove();

    }


    if(move!==-1){

        makeMove(move,AI);

    }

}


function randomMove(){

    let empty=[];

    for(let i=0;i<board.length;i++){

        if(board[i]===""){
            empty.push(i);
        }

    }

    if(empty.length===0)
        return -1;


    return empty[
        Math.floor(Math.random()*empty.length)
    ];

}


// SMART AI MOVE

function bestMove(){

    let bestScore=-Infinity;
    let move;


    for(let i=0;i<board.length;i++){

        if(board[i]===""){

            board[i]=AI;

            let score=minimax(
                board,
                0,
                false
            );

            board[i]="";


            if(score>bestScore){

                bestScore=score;
                move=i;

            }

        }

    }

    return move;

}


// MINIMAX ALGORITHM

function minimax(newBoard,depth,isMaximizing){

    let result=evaluateBoard();

    if(result!==null){

        return result;

    }


    if(isMaximizing){

        let bestScore=-Infinity;


        for(let i=0;i<newBoard.length;i++){

            if(newBoard[i]===""){

                newBoard[i]=AI;

                let score=minimax(
                    newBoard,
                    depth+1,
                    false
                );

                newBoard[i]="";


                bestScore=Math.max(
                    score,
                    bestScore
                );

            }

        }

        return bestScore;

    }
    else{

        let bestScore=Infinity;


        for(let i=0;i<newBoard.length;i++){

            if(newBoard[i]===""){

                newBoard[i]=HUMAN;

                let score=minimax(
                    newBoard,
                    depth+1,
                    true
                );

                newBoard[i]="";


                bestScore=Math.min(
                    score,
                    bestScore
                );

            }

        }

        return bestScore;

    }

}

// PART 3 OF 4
// WIN CHECKING SYSTEM

function evaluateBoard(){

    for(const pattern of winPatterns){

        const [a,b,c]=pattern;


        if(
            board[a] &&
            board[a]===board[b] &&
            board[a]===board[c]
        ){

            if(board[a]===AI)
                return 10;

            if(board[a]===HUMAN)
                return -10;

        }

    }


    if(!board.includes(""))
        return 0;


    return null;

}



function checkWinner(){

    let winner=null;


    for(const pattern of winPatterns){

        const [a,b,c]=pattern;


        if(
            board[a] &&
            board[a]===board[b] &&
            board[a]===board[c]
        ){

            winner=board[a];


            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");


            break;

        }

    }



    if(winner){

        running=false;


        if(winner==="X"){

            xWins++;

            scoreX.textContent=xWins;

            statusText.textContent=
                playerX.value+" Wins!";

        }
        else{

            oWins++;

            scoreO.textContent=oWins;

            statusText.textContent=
                playerO.value+" Wins!";

        }


        return;

    }



    if(!board.includes("")){

        running=false;

        draws++;

        scoreDraw.textContent=draws;

        statusText.textContent="Draw!";


        return;

    }

}



function restartRound(){

    board=[
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    running=true;

    currentPlayer="X";


    cells.forEach(cell=>{

        cell.textContent="";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("win");

    });



    statusText.textContent=
        playerX.value+"'s Turn";

}

// PART 4 OF 4
// NEW GAME + STARTUP


function newGame(){

    xWins=0;
    oWins=0;
    draws=0;


    scoreX.textContent=0;
    scoreO.textContent=0;
    scoreDraw.textContent=0;


    restartRound();

}

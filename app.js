"use strict";

const gameBoard = () => {
    const players = {
        player1: `<i class="fas fa-times"></i>`,
        player2: `<i class="far fa-circle"></i>`,
    }
    const computers = {
        letterO: `<i class="far fa-circle"></i>`,
    }
    let gridTest = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    return {players, computers, gameBoard, gridTest}
}

const gameInfo = () => {
    const btns = document.querySelectorAll(".block");
    const newBtn = document.querySelector(".rest-btn");
    const robot = document.querySelector(".c-btn");
    const player = document.querySelector(".p-btn");
    const winner = document.querySelector(".announce");
    const board = gameBoard();
    const playerLocate = board.players;

    const findDiag = cross => {
        for (let i = 0; i < board.gridTest.length; i++) {
            for (let j = 0; j < board.gridTest.length; j++) {
                if (i === j && cross === "X") {
                    if (board.gridTest.map((e, i) => e[i] === cross).every(x => x === true)) {
                        btns.forEach(block => block.style.pointerEvents = "none")
                        winner.innerText = `Player: ${cross} wins!`
                        winner.style.visibility = "unset"
                    }
                    if (board.gridTest.map((e, i) => e[board.gridTest.length - i - 1] === cross).every(x => x === true)) {
                        btns.forEach(block => block.style.pointerEvents = "none")
                        winner.innerText = `Player: ${cross} wins!`
                        winner.style.visibility = "unset"
                    }
                }
                if (i === j && cross === "O") {
                    if (board.gridTest.map((e, i) => e[i] === cross).every(x => x === true)) {
                        btns.forEach(block => block.style.pointerEvents = "none")
                        winner.innerText = `Player: ${cross} wins!`
                        winner.style.visibility = "unset"
                    }
                    if (board.gridTest.map((e, i) => e[board.gridTest.length - i - 1] === cross).every(x => x === true)) {
                        btns.forEach(block => block.style.pointerEvents = "none")
                        winner.innerText = `Player: ${cross} wins!`
                        winner.style.visibility = "unset"
                    }
                }
            }
        }
            if (board.gridTest.every(x => x.every(x => typeof x === "string")) && !(winner.style.visibility == "unset")) {
                winner.style.visibility = "unset"
                winner.innerText = `It's a draw!`
            }
    }
    const playerOne = block => {
        for (let i=0; i<board.gridTest.length; i++) {
            for (let j=0; j<board.gridTest.length; j++) {
                const blockIndex = board.gridTest[i].indexOf(Number(block.target.id));
                if (Number(block.target.id) === board.gridTest[i][j]) {
                    board.gridTest[i].splice(blockIndex, 1, "X");
                }
                if (board.gridTest[i].every(x => x === "X")) {
                    block.target.innerHTML = playerLocate.player1
                    btns.forEach(block => block.style.pointerEvents = "none")
                    winner.innerText = `Player: X wins!`
                    winner.style.visibility = "unset"
                    return;
                }
                if (board.gridTest.every(x => x[j] === "X")) {
                    block.target.innerHTML = playerLocate.player1
                    btns.forEach(block => block.style.pointerEvents = "none")
                    winner.innerText = `Player: X wins!`
                    winner.style.visibility = "unset"
                    return;
                }
            }
        }
        findDiag("X") 
        if (block.target.innerHTML == "") {
            block.target.innerHTML = playerLocate.player1
            btns.forEach(block => block.removeEventListener("click", playerOne))
            btns.forEach(block => block.addEventListener("click", playerTwo))
        }
    }
    const playerTwo = block => {
        for (let i=0; i<board.gridTest.length; i++) {
            for (let j=0; j<board.gridTest.length; j++) {
                const blockIndex = board.gridTest[i].indexOf(Number(block.target.id));
                if (Number(block.target.id) === board.gridTest[i][j]) {
                    board.gridTest[i].splice(blockIndex, 1, "O");
                }
                if (board.gridTest[i].every(x => x === "O")) {
                    block.target.innerHTML = playerLocate.player2
                    btns.forEach(block => block.style.pointerEvents = "none")
                    winner.innerText = `Player: O wins!`
                    winner.style.visibility = "unset"
                    return;
                }
                if (board.gridTest.every(x => x[j] === "O")) {
                    block.target.innerHTML = playerLocate.player2
                    btns.forEach(block => block.style.pointerEvents = "none")
                    winner.innerText = `Player: O wins!`
                    winner.style.visibility = "unset"
                    return;
                }
            }
        }
        findDiag("O")
        if (block.target.innerHTML == "") {
            block.target.innerHTML = playerLocate.player2
            btns.forEach(block => block.removeEventListener("click", playerTwo))
            btns.forEach(block => block.addEventListener("click", playerOne))
        }
        
    }
    const clearGame = () => {
        btns.forEach(blocks => {
            blocks.innerHTML = "";
            board.gridTest = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
            blocks.addEventListener("click", playerOne)
            blocks.removeEventListener("click", playerTwo)
            blocks.style.pointerEvents = "auto"
        })
        document.querySelector(".announce").style.visibility = "hidden";
    }
   
    const blocks = () => {
        btns.forEach(item => {
            item.addEventListener("click", playerOne)
            btns.forEach(block => block.removeEventListener("click", playerTwo))
        })
    };
    newBtn.addEventListener("click", clearGame);

    return {blocks}
}

const gameStart = (() => {
    const start = gameInfo();
    
    start.blocks();
})()

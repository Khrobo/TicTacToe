"use strict";

const gameBoard = () => {
    const players = {
        player1: `<i class="fas fa-times"></i>`,
        player2: `<i class="far fa-circle"></i>`,
        score1: 0,
        score2: 0
    }
    const computers = {
        letterO: `<i class="far fa-circle"></i>`,
        cScore: 0,
        pScore: 0
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
    const board = gameBoard();
    const playerLocate = board.players
    let xTokens = [];
    let oTokens = []

    const findDiag = cross => {
        board.gridTest.forEach((i, j) => {
            let col = board.gridTest[0].length - 1; // REVERSES THE DIAGONAL SEARCH
            let c = j;
            let xTokenNum = xTokens.length;
            let oTokenNum = oTokens.length;
            
            c = col - c;
            
            console.log(board.gridTest[j][c])
            console.log(board.gridTest[j]);
            console.log(i)
            console.log(i[j])
            console.log(xTokens)
            if (i[j] === cross && cross === "X") { // ADD A WAY TO MAKE CROSSES STOP ADDING MORE AFTER WINS
                xTokens.push(i[j])
                if (xTokens.length === 6 && xTokens.every(x => x === cross)) {
                    xTokens.splice(xTokenNum / 2, 3)
                    btns.forEach(block => block.removeEventListener("click", playerTwo))
                    btns.forEach(block => block.removeEventListener("click", playerOne))
                    console.log(xTokens)
                    return;
                }
            } else if (board.gridTest[j][c] === cross && cross === "X") {
                xTokens.push(board.gridTest[j][c])
                console.log(xTokens)
                if (xTokens.length === 6 && xTokens.every(x => x === cross)) {
                    btns.forEach(block => block.removeEventListener("click", playerTwo))
                    btns.forEach(block => block.removeEventListener("click", playerOne))
                    xTokens.splice(xTokenNum / 2, 3)
                    console.log(xTokens)
                    return;
                }
            }
            if (i[j] === cross && cross === "O") {
                oTokens.push(i[j])
                if (oTokens.length === 6 && oTokens.every(x => x === cross)) {
                    btns.forEach(block => block.removeEventListener("click", playerOne))
                    btns.forEach(block => block.removeEventListener("click", playerTwo))
                    oTokens.splice(oTokenNum / 2, 3)
                    console.log(oTokens)
                }
            } else if (board.gridTest[j][c] === cross && cross === "X") {
                oTokens.push(board.gridTest[j][c])
                console.log(oTokens)
                if (oTokens.length === 6 && oTokens.every(x => x === cross)) {
                    btns.forEach(block => block.removeEventListener("click", playerTwo))
                    btns.forEach(block => block.removeEventListener("click", playerOne))
                    oTokens.splice(oTokenNum / 2, 3)
                    console.log(oTokens)
                }
            }
        })
    }
    const playerOne = (block) => {
        for (let i=0; i<board.gridTest.length; i++) {
            for (let j=0; j<board.gridTest.length; j++) {
                const blockIndex = board.gridTest[i].indexOf(Number(block.target.id));
                if (Number(block.target.id) === board.gridTest[i][j]) {
                    console.log(blockIndex);
                    board.gridTest[i].splice(blockIndex, 1, "X");
                    console.log(board.gridTest);
                    console.log(board.gridTest[i])
                }
                if (board.gridTest[i].every(x => x === "X")) { // WORKS
                    console.log("X ROW IS TRUE")
                    block.target.innerHTML = playerLocate.player1
                    btns.forEach(block => block.removeEventListener("click", playerTwo))
                    btns.forEach(block => block.removeEventListener("click", playerOne))
                    return;
                }
                if (board.gridTest.every(x => x[j] === "X")) { // WORKS
                    console.log("COLUMN X IS ALL TRUE")
                    block.target.innerHTML = playerLocate.player1
                    btns.forEach(block => block.removeEventListener("click", playerTwo))
                    btns.forEach(block => block.removeEventListener("click", playerOne))
                    return;
                }
            }
        }
        findDiag("X") // WORKS. NOW ADD THE FINISHING TOUCHES AND YOU WILL BE DONE
        if (block.target.innerHTML == "") { // ADD POSITION CHECKER
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
                    console.log(blockIndex);
                    board.gridTest[i].splice(blockIndex, 1, "O");
                    console.log(board.gridTest);
                    console.log(board.gridTest[i])
                }
                if (board.gridTest[i].every(x => x === "O")) {
                    console.log("O ROW IS TRUE")
                    block.target.innerHTML = playerLocate.player2
                    btns.forEach(block => block.removeEventListener("click", playerOne))
                    btns.forEach(block => block.removeEventListener("click", playerTwo))
                    return;
                }
                if (board.gridTest.every(x => x[j] === "O")) {
                    console.log("COLUMN O IS ALL TRUE")
                    block.target.innerHTML = playerLocate.player2
                    btns.forEach(block => block.removeEventListener("click", playerOne))
                    btns.forEach(block => block.removeEventListener("click", playerTwo))
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
            console.log(board.gridTest);
            blocks.addEventListener("click", playerOne)
            blocks.removeEventListener("click", playerTwo)
        })
        oTokens.splice(0, 3)
        xTokens.splice(0, 3)
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











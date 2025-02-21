let coins;
let res;
let boardMatrix;
let boardRedux;
let magicSquare;
let flipSquare;
let flagMagic = false;
let flagFlip = false;

function setup() {
    createCanvas(400, 400);
    coins = Array(8).fill().map(() => Array(8).fill(0));
    boardMatrix = Array.from({ length: 8 }, (_, i) => Array.from({ length: 8 }, (_, j) => i * 8 + j));
    res = Array.from({ length: 8 }, (_, i) => Array.from({ length: 8 }, (_, j) => (i + j) % 2));
    noLoop();
    updateDisplay();
}

function draw() {}

function mousePressed() {
    let x = Math.floor(mouseX / 50);
    let y = Math.floor(mouseY / 50);

    if (mouseButton === LEFT) {
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            coins[y][x] ^= 1;
            updateDisplay();
        }
    } else if (mouseButton === RIGHT) {
        if (x >= 0 && x < 8 && y >= 0 && y < 8) {
            magicSquare = boardMatrix[y][x];
            flipSquare = boardRedux ^ magicSquare;
            flagMagic = !flagMagic;
            flagFlip = !flagFlip;
            updateDisplay();
        }
    }
    return false; // prevent default
}

function updateBoardNumber() {
    boardRedux = coins.flat().reduce((acc, val, idx) => acc ^ (val * boardMatrix[Math.floor(idx / 8)][idx % 8]), 0);
}

function updateDisplay() {
    updateBoardNumber();
    background(255);

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (res[i][j] === 0) {
                fill(200);
            } else {
                fill(255);
            }
            rect(j * 50, i * 50, 50, 50);

            if (coins[i][j] !== 0) {
                fill(128);
                ellipse(j * 50 + 25, i * 50 + 25, 30, 30);
            }

            fill(0);
            textSize(12);
            textAlign(RIGHT, TOP);
            text(boardMatrix[i][j], j * 50 + 48, i * 50 + 2);
        }
    }

    if (flagMagic) {
        fill(255, 0, 0, 100);
        ellipse((magicSquare % 8) * 50 + 25, Math.floor(magicSquare / 8) * 50 + 25, 40, 40);
    }

    if (flagFlip) {
        fill(0, 0, 255, 100);
        arc((flipSquare % 8) * 50 + 25, Math.floor(flipSquare / 8) * 50 + 25, 60, 60, radians(15), radians(60));
    }

    fill(0);
    textSize(16);
    textAlign(LEFT, BOTTOM);
    let title = `Board number: ${boardRedux} `;
    if (flagMagic) {
        title += `Magic square: ${magicSquare} Flip square: ${flipSquare}`;
    }
    text(title, 10, height - 10);
}
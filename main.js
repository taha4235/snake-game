const gameBoard = document.querySelector("#gameBoard")
const ctx = gameBoard.getContext("2d")
const scoreText = document.querySelector("#score")
const resetBtn = document.querySelector("#ResetBtn")
const gamewidth = gameBoard.width;
const gameheight = gameBoard.height;
const boardbackground = 'white';
const snakeColor = 'lightgreen';
const snakeBorder = "black";
const foodColor = "red";
const UnitSize = 25;
let running = false;
let xVelocity = UnitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    { x: UnitSize * 4, y: 0 },
    { x: UnitSize * 3, y: 0 },
    { x: UnitSize * 2, y: 0 },
    { x: UnitSize, y: 0 },
    { x: 0, y: 0 }
];
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetgame);
gameStart();
createFood()
drawFood();
clearBoard();
drawFood()
moveSnake();
resetgame();
drawFood();
drawSnake()

function gameStart() {
    running = true;
    score.textContent = score;
    createFood();
    drawFood();
    nextTick()
}

function resetgame() {
    score = 0;
    xVelocity = UnitSize;
    yVelocity = 0;
    let snake = [
        { x: UnitSize * 4, y: 0 },
        { x: UnitSize * 3, y: 0 },
        { x: UnitSize * 2, y: 0 },
        { x: UnitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart()
}

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick()
        }, 75)

    }
};

function clearBoard() {
    ctx.fillStyle = boardbackground
    ctx.fillRect(0, 0, gamewidth, gameheight)
};

function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / UnitSize)
        return randNum
    }
    foodX = randomFood(0, gamewidth - UnitSize)
    foodY = randomFood(0, gamewidth - UnitSize)
    console.log(foodX)
};

function drawFood() {
    ctx.fillstylefoodcolor;
    ctx.fillRect(foodX, foodY, UnitSize, UnitSize)
}

function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        score.textContent = score
        createFood()
    } else {
        snake.pop()
    }
};

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gamewidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameheight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x == snake[i].y) {
            running = false
        }

    }

}

function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("game Over!", gamewidth / 2, gameheight / 2);
    running = false
}



function drawSnake() {
    ctx.fillStyle = snakeColor
    ctx.strokeStyle = snakeBorder
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, UnitSize, UnitSize)
        ctx.fillRect(snakePart.x, snakePart.y, UnitSize, UnitSize)
    })
};

function changeDirection(event) {
    const keyPressed = event.Keycode;
    const LEFT = 37;
    const UP = 38;
    const Right = 39;
    const Down = 40;
    const goingUp = (yVelocity == -UnitSize)
    const goingDown = (yVelocity == UnitSize)
    const goingRight = (xVelocity == UnitSize);
    const goingLeft = (xVelocity == -UnitSize);
    switch (true) {
        case (keyPressed == Left && !goingRight):
            xVelocity = -UnitSize;
            yVelocity = 0;
            break
        case (keyPressed == Up && !goingDown):
            yVelocity = -UnitSize;
            xVelocity = 0;
            break;
        case (keyPressed == Right && !goingLEFT):
            xVelocity = -UnitSize;
            yVelocity = UnitSize;
            break;
        case (keyPressed == Down && !goingUP):
            xVelocity = 0;
            yVelocity = UnitSize;
            break;
    }
};
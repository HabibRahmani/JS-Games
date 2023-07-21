const grid = document.querySelector('.grid');
let score = document.querySelector('.score');
const result = document.querySelector('.result');
const timerShow = document.querySelector('.timerShow');



const gameWidth = 810
const gameHeight = 400
let timerId;
let speed = 15;
let Yscore = 0;
let xLine = 2
let yLine = 2
let currentProgressWidth;

let userWidth = 150;
const userPosition = [330, 10];
let currentPosition;

const ballStart = [390, 40]

let user, ball, ballStartCurrentPosition, randomGift, randomBlock;

// create block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
    }
}

//all blocks 
const initialBlocks = [
    new Block(10, 370),
    new Block(170, 370),
    new Block(330, 370),
    new Block(490, 370),
    new Block(650, 370),
    new Block(10, 340),
    new Block(170, 340),
    new Block(330, 340),
    new Block(490, 340),
    new Block(650, 340),
    new Block(10, 310),
    new Block(170, 310),
    new Block(330, 310),
    new Block(490, 310),
    new Block(650, 310),
    new Block(10, 280),
    new Block(170, 280),
    new Block(330, 280),
    new Block(490, 280),
    new Block(650, 280),
    new Block(10, 250),
    new Block(170, 250),
    new Block(330, 250),
    new Block(490, 250),
    new Block(650, 250),
    new Block(10, 220),
    new Block(170, 220),
    new Block(330, 220),
    new Block(490, 220),
    new Block(650, 220),
]

let blocks = [...initialBlocks];

function startGame() {
    result.style.backgroundColor = "rgb(99, 136, 114)"

    randomGift = Math.floor(Math.random() * 10) + 14;
    score.innerHTML = '0';
    clearInterval(timerId)
    xLine = 2;
    yLine = 2;
    currentProgressWidth = 815;
    timerShow.style.width = currentProgressWidth + 'px';
    timerShow.style.display = 'none'

    ballStartCurrentPosition = [...ballStart];
    currentPosition = [...userPosition];

    blocks = [...initialBlocks];
    grid.innerHTML = "";
    addBlocks();

    // user 
    user = document.createElement('div')
    user.classList.add('user')
    drawUser()
    grid.appendChild(user);

    // create ball
    ball = document.createElement('div');
    ball.classList.add('ball');
    drawBall()
    grid.appendChild(ball);
    Yscore = 0;
    speed = 15;
    timerId = setInterval(moveBall, speed)
    randomBlock = [blocks[randomGift].bottomLeft[0], blocks[randomGift].bottomLeft[1]];

}

// add all my blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}

startGame();


// draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

// draw the ball 
function drawBall() {
    ball.style.left = ballStartCurrentPosition[0] + 'px';
    ball.style.bottom = ballStartCurrentPosition[1] + 'px';
}

//mouse over
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 10) {
                currentPosition[0] -= 20
                drawUser()
            }
            break;

        case 'ArrowRight':
            if (currentPosition[0] < gameWidth - userWidth - 25) {
                currentPosition[0] += 20
                drawUser()
            }
            break;

    }
}

document.addEventListener('keydown', moveUser);


function moveBall() {
    ballStartCurrentPosition[0] += xLine
    ballStartCurrentPosition[1] += yLine
    drawBall()
    checkForLine()
}


//*********** Create Gift ************//
let xGift;
let yGift;
let timerGift;
const gift = document.createElement('div')

function createGift(a) {
    gift.classList.add('gift')
    xGift = blocks[a].bottomLeft[0] + 60;
    yGift = blocks[a].bottomLeft[1];
    grid.appendChild(gift);

    timerGift = setInterval(position, 200)

    function position() {
        gift.style.left = xGift + 'px';
        gift.style.bottom = yGift + 'px';
        // check Gift out
        if (yGift <= -10) {
            gift.classList.remove('gift')
            clearInterval(timerGift);
        }
        yGift += -10;
    }

}
// End of Gift //

// %%%%%%%%%%%%% Gift Time %%%%%%%%%%%%%% //
function giftTimer() {
    let timeCount = 0;
    let timer;
    timer = setInterval(count, 1000);
    function count() {

        if (timeCount === 7) {
            userWidth = 150;
            user.style.width = userWidth + 'px';
        }
        timeCount++;

    }
}
// End of giftTimer //
let progressTimer;
let up = 815 / 8;
currentProgressWidth = 815;
function progress() {
    timerShow.style.display = 'block'
    function cutWidth() {
        if (currentProgressWidth <= up) {
            console.log("if opend");
            clearInterval(progressTimer)
            timerShow.style.display = 'none'
        }
        currentProgressWidth -= up;
        timerShow.style.width = currentProgressWidth + 'px';

    }
    progressTimer = setInterval(cutWidth, 1000)

}

// direction
function checkForLine() {
    //************ check for boxes ************//
    for (let i = 0; i < blocks.length; i++) {
        const x = blocks[i].bottomLeft[0];
        const y = blocks[i].bottomLeft[1];



        if (ballStartCurrentPosition[0] > x && ballStartCurrentPosition[0] < x + 150 &&
            (ballStartCurrentPosition[1] + 30) > y && ballStartCurrentPosition[1] < y + 25) {
            const allBlocks = document.querySelectorAll('.block')
            allBlocks[i].classList.remove('block');
            let giftBlock = allBlocks[i];

            if (randomBlock[0] + 'px' === giftBlock.style.left && randomBlock[1] + 'px' === giftBlock.style.bottom) {
                createGift(i)

            }

            blocks.splice(i, 1)
            checkDirection()

            Yscore++;
            score.innerHTML = Yscore;
            if (Yscore % 3 === 0) {
                speed--;
                clearInterval(timerId)
                timerId = setInterval(moveBall, speed)
            }
        }

    }
    if (Yscore === 30) {
        score.innerHTML = 'You Win!';
        result.style.backgroundColor = "green"
        clearInterval(timerId)
        gift.classList.remove('gift')
    }


    if (xGift > currentPosition[0] && xGift < currentPosition[0] + userWidth &&
        (yGift + 20) > currentPosition[1] && yGift < currentPosition[1] + 25) {
        clearInterval(timerGift)
        gift.classList.remove('gift')
        userWidth = 190;
        user.style.width = userWidth + 'px';
        xGift = 0;
        yGift = 0;
        giftTimer()
        progress()

    }


    if (ballStartCurrentPosition[0] > currentPosition[0] && ballStartCurrentPosition[0] < currentPosition[0] + userWidth &&
        (ballStartCurrentPosition[1] + 30) > currentPosition[1] && ballStartCurrentPosition[1] < currentPosition[1] + 25) {
        checkDirection()
    }


    // check around the ground 
    if (ballStartCurrentPosition[0] >= 780 || ballStartCurrentPosition[1] >= 370 || ballStartCurrentPosition[0] <= 0) {
        checkDirection()
    }

    // check for lose 
    if (ballStartCurrentPosition[1] <= 0) {
        score.innerHTML = 'You Lose!'
        clearInterval(timerId)
        gift.classList.remove('gift')
        result.style.backgroundColor = "rgb(204, 28, 28)"
        timerShow.style.display = 'none'
        clearInterval(progressTimer)
    }


}

const rePlay = document.querySelector('.rePlay')

rePlay.addEventListener('click', function () {
    startGame();
})

// check direction
function checkDirection() {
    let a = userWidth / 2;

    if (ballStartCurrentPosition[0] > currentPosition[0] && ballStartCurrentPosition[0] < currentPosition[0] + a - 30
        && ballStartCurrentPosition[1] + 30 > currentPosition[1] && ballStartCurrentPosition[1] < currentPosition[1] + 25) {
        xLine = -2;
        yLine = 2;
    } else if (ballStartCurrentPosition[0] > currentPosition[0] + a + 30 && ballStartCurrentPosition[0] < currentPosition[0] + userWidth + 5
        && ballStartCurrentPosition[1] + 30 > currentPosition[1] && ballStartCurrentPosition[1] < currentPosition[1] + 25) {
        xLine = 2;
        yLine = 2;
    } else if (xLine === 2 && yLine === 2) {
        yLine = -2
        return;
    } else if (xLine === 2 && yLine === -2) {
        xLine = -2
        return;
    } else if (xLine === -2 && yLine === -2) {
        yLine = 2
        return;
    } else if (xLine === -2 && yLine === 2) {
        xLine = 2
        return;
    }

    if(ball.style.left >= 780+'px' && ball.style.bottom <= 30+'px'){
        xLine = -2
        yLine = 2
    }



}


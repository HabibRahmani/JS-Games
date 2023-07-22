const cardArray = [
    {
        name: 'pizza',
        img: 'images/pizza.jpeg',
    },
    {
        name: 'computer',
        img: 'images/computer.jpeg',
    },
    {
        name: 'ballon',
        img: 'images/ballon.jpeg',
    },
    {
        name: 'oldWall',
        img: 'images/oldWall.jpeg',
    },
    {
        name: 'oldCastle',
        img: 'images/oldCastle.jpeg',
    },
    {
        name: 'stones',
        img: 'images/stones.jpeg',
    },
    {
        name: 'pizza',
        img: 'images/pizza.jpeg',
    },
    {
        name: 'computer',
        img: 'images/computer.jpeg',
    },
    {
        name: 'ballon',
        img: 'images/ballon.jpeg',
    },
    {
        name: 'oldWall',
        img: 'images/oldWall.jpeg',
    },
    {
        name: 'oldCastle',
        img: 'images/oldCastle.jpeg',
    },
    {
        name: 'stones',
        img: 'images/stones.jpeg',
    }
];

cardArray.sort(() => 0.5 - Math.random() )

const resultDisplay = document.getElementById('result');


const gridDisplay = document.getElementById('grid');
let cardChosen = [];
let cardChosenIds = [];
const cardsWon = [];

function cardBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/skull.jpeg')
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.appendChild(card);
    }
}

cardBoard();
const alertContent = document.querySelector('.alert');


function hideAlert() {
    alertContent.textContent = '';
}

let i = 1;

function checkMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardChosenIds[0];
    const optionTwoId = cardChosenIds[1];

    if(optionOneId == optionTwoId){
        alertContent.textContent = "You clicked the same image";
        setTimeout(hideAlert, 1000);
        cards[optionOneId].setAttribute('src', 'images/skull.jpeg');
    }

    else if (cardChosen[0] == cardChosen[1]) {
        alertContent.textContent = "You found a match";
        setTimeout(hideAlert, 1000);


        cards[optionOneId].setAttribute('src', 'images/background.png');
        cards[optionTwoId].setAttribute('src', 'images/background.png');

        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push[cardChosen];
        
        
        if (i == 6) {
            resultDisplay.textContent = 'Congratulations You Found Them All';
        }else{
            resultDisplay.textContent = i;
        }
        i++;
    } else {
        cards[optionOneId].setAttribute('src', 'images/skull.jpeg');
        cards[optionTwoId].setAttribute('src', 'images/skull.jpeg');

        alertContent.textContent = "Sorry try again";
        setTimeout(hideAlert, 500);
    }
    
    cardChosen = [];
    cardChosenIds = [];



    

}



function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardChosen.push(cardArray[cardId].name)
    cardChosenIds.push(cardId);


    this.setAttribute('src', cardArray[cardId].img);
    if (cardChosen.length === 2) {
        setTimeout(checkMatch, 500);
    }
}
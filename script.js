// card info

class Card {
    constructor(cardname, cssname, value) {
        this.cardname = cardname;
        this.cssname = cssname;
        this.value = value;
    };
    cardFace () {return this.cssname};
    getValue () {return this.value};
};

let mDeck, p1Deck, p2Deck;

mDeck = [
    new Card('Ace of Diamonds', 'aceofdiamonds', 14),
    new Card('King of Diamonds', 'kingofdiamonds', 13),
    new Card('Queen of Diamonds', 'queenofdiamonds', 12),
    new Card('Jack of Diamonds', 'jackofdiamonds', 11),
    new Card('Ten of Diamonds', 'tenofdiamonds', 10),
    new Card('Nine of Diamonds', 'nineofdiamonds', 9),
    new Card('Eight of Diamonds', 'eightofdiamonds', 8),
    new Card('Seven of Diamonds', 'sevenofdiamonds', 7),
    new Card('Six of Diamonds', 'sixofdiamonds', 6),
    new Card('Five of Diamonds', 'fiveofdiamonds', 5),
    new Card('Four of Diamonds', 'fourofdiamonds', 4),
    new Card('Three of Diamonds', 'threeofdiamonds', 3),
    new Card('Two of Diamonds', 'twoofdiamonds', 2),
    new Card('Ace of Hearts', 'aceofhearts', 14),
    new Card('King of Hearts', 'kingofhearts', 13),
    new Card('Queen of Hearts', 'queenofhearts', 12),
    new Card('Jack of Hearts', 'jackofhearts', 11),
    new Card('Ten of Hearts', 'tenofhearts', 10),
    new Card('Nine of Hearts', 'nineofhearts', 9),
    new Card('Eight of Hearts', 'eightofhearts', 8),
    new Card('Seven of Hearts', 'sevenofhearts', 7),
    new Card('Six of Hearts', 'sixofhearts', 6),
    new Card('Five of Hearts', 'fiveofhearts', 5),
    new Card('Four of Hearts', 'fourofhearts', 4),
    new Card('Three of Hearts', 'threeofhearts', 3),
    new Card('Two of Hearts', 'twoofhearts', 2),
    new Card('Ace of Spades', 'aceofspades', 14),
    new Card('King of Spades', 'kingofspades', 13),
    new Card('Queen of Spades', 'queenofspades', 12),
    new Card('Jack of Spades', 'jackofspades', 11),
    new Card('Ten of Spades', 'tenofspades', 10),
    new Card('Nine of Spades', 'nineofspades', 9),
    new Card('Eight of Spades', 'eightofspades', 8),
    new Card('Seven of Spades', 'sevenofspades', 7),
    new Card('Six of Spades', 'sixofspades', 6),
    new Card('Five of Spades', 'fiveofspades', 5),
    new Card('Four of Spades', 'fourofspades', 4),
    new Card('Three of Spades', 'threeofspades', 3),
    new Card('Two of Spades', 'twoofspades', 2),
    new Card('Ace of Clubs', 'aceofclubs', 14),
    new Card('King of Clubs', 'kingofclubs', 13),
    new Card('Queen of Clubs', 'queenofclubs', 12),
    new Card('Jack of Clubs', 'jackofclubs', 11),
    new Card('Ten of Clubs', 'tenofclubs', 10),
    new Card('Nine of Clubs', 'nineofclubs', 9),
    new Card('Eight of Clubs', 'eightofclubs', 8),
    new Card('Seven of Clubs', 'sevenofclubs', 7),
    new Card('Six of Clubs', 'sixofclubs', 6),
    new Card('Five of Clubs', 'fiveofclubs', 5),
    new Card('Four of Clubs', 'fourofclubs', 4),
    new Card('Three of Clubs', 'threeofclubs', 3),
    new Card('Two of Clubs', 'twoofclubs', 2),
    new Card('Red Joker', 'jokerred', 15),
    new Card('Black Joker', 'jokerblack', 15),
];

let p1Discard = [];
let p2Discard = [];

mDeck = shuffle(mDeck);
console.dir(mDeck);

p1Deck = mDeck.splice(27, 27);
p2Deck = mDeck.splice(0, 27);

console.log(p1Deck);
console.log(p2Deck);

// cached element references

const p1DeckEl = document.getElementById('player1deck');
const p1DiscardEl = document.getElementById('player1discard');
const p1DecisionEl = document.getElementById('player1decision');
const p1War1El = document.getElementById('player1war1');
const p1War2El = document.getElementById('player1war2');
const p1War3El = document.getElementById('player1war3');
const p1RevealEl = document.getElementById('player1reveal');

const p2DeckEl = document.getElementById('player2deck');
const p2DiscardEl = document.getElementById('player2discard');
const p2DecisionEl = document.getElementById('player2decision');
const p2War1El = document.getElementById('player2war1');
const p2War2El = document.getElementById('player2war2');
const p2War3El = document.getElementById('player2war3');
const p2RevealEl = document.getElementById('player2reveal');

const dialogue = document.getElementById('dialogue');

// event listeners

p1DeckEl.addEventListener('click', winShuffleReveal);

p1DiscardEl.addEventListener('click', play);

//functions

function shuffle(inputDeck) {
    let outputDeck = [];
    while (inputDeck.length > 0) {
        let randomIndex = Math.floor(Math.random() * inputDeck.length);
        let randomCard  = inputDeck[randomIndex];
        inputDeck.splice(randomIndex, 1);
        outputDeck.push(randomCard);
    };
    return outputDeck;
};

function winShuffleReveal() {
    let p1Count = p1Discard.length + p1Deck.length;
    let p2Count = p2Discard.length + p2Deck.length;
    console.log(p1Count);
    console.log(p2Count);

    if (p1Count.length === 54) {return dialogue.textContent = 'Player 1 wins!'};
    if (p2Count.length === 54) {return dialogue.textContent = 'Player 2 wins!'};

    if (p1Deck.length === 0) {p1Deck = shuffle(p1Discard)};
    if (p2Deck.length === 0) {p2Deck = shuffle(p2Discard)};

    p1RevealEl.classList.add('card', p1Deck[0].cardFace());
    p2RevealEl.classList.add('card', p2Deck[0].cardFace());

};

function play() {
    if (p1Deck[0].getValue() === p2Deck[0].getValue()) {
        return warReveal();
    }
    else { 
        let transferCard1 = p1Deck.shift();
        let transferCard2 = p2Deck.shift();
        console.log(transferCard1);
        console.log(transferCard2);

        if (transferCard1.getValue() > transferCard2.getValue()) {
            p1Discard.unshift(transferCard1);
            p1Discard.unshift(transferCard2);
            if (p1Discard.length > 2) {
                p1DiscardEl.classList.remove(p1Discard[2].cardFace());
            };
            p1DiscardEl.classList.add(transferCard2.cardFace());
        } else {
            p2Discard.unshift(transferCard2);
            p2Discard.unshift(transferCard1);
            if (p2Discard.length > 2) {
                p2DiscardEl.classList.remove(p2Discard[2].cardFace());
            };
            p2DiscardEl.classList.add(transferCard1.cardFace());
        };

        p1RevealEl.classList.remove('card', transferCard1.cardFace());
        p2RevealEl.classList.remove('card', transferCard2.cardFace());
        console.log(p1Discard);
        console.log(p1Deck);
        console.log(p2Discard);
        console.log(p2Deck);
    };
};

function warReveal() {
    if (p1Deck.length < 4) {replenishDeck(p1Deck)};
    if (p2Deck.length < 4) {replenishDeck(p2Deck)};

    p1War1El.classList.add('card', p1Deck[1].cardFace());
    p1War2El.classList.add('card', p1Deck[2].cardFace());
    p1War3El.classList.add('card', p1Deck[3].cardFace());
    p1DecisionEl.classList.add('card', p1Deck[4].cardFace());
    p2War1El.classList.add('card', p2Deck[1].cardFace());
    p2War2El.classList.add('card', p2Deck[2].cardFace());
    p2War3El.classList.add('card', p2Deck[3].cardFace());
    p2DecisionEl.classList.add('card', p2Deck[4].cardFace());
    
    p1DecisionEl.addEventListener('click', warDecision);
    return alert('Click the card to the upper right of your deck to resolve the war condition...');
}

function warDecision () {
    p1War1El.classList.remove('card', p1Deck[1].cardFace());
    p1War2El.classList.remove('card', p1Deck[2].cardFace());
    p1War3El.classList.remove('card', p1Deck[3].cardFace());
    p1DecisionEl.classList.remove('card', p1Deck[4].cardFace());
    p2War1El.classList.remove('card', p2Deck[1].cardFace());
    p2War2El.classList.remove('card', p2Deck[2].cardFace());
    p2War3El.classList.remove('card', p2Deck[3].cardFace());
    p2DecisionEl.classList.remove('card', p2Deck[4].cardFace());

    let transferCard1 = p1Deck.shift();
    let transferCard2 = p2Deck.shift();
    console.log(transferCard1);
    console.log(transferCard2);

    p1RevealEl.classList.remove('card', transferCard1.cardFace());
    p2RevealEl.classList.remove('card', transferCard2.cardFace());

    let capture2 = p1Deck.shift();
    console.log(capture2);
    let capture3 = p1Deck.shift();
    console.log(capture3);
    let capture4 = p1Deck.shift();
    console.log(capture4);
    let capture5 = p1Deck.shift();
    console.log(capture5);

    let capture7 = p2Deck.shift();
    console.log(capture7);
    let capture8 = p2Deck.shift();
    console.log(capture8);
    let capture9 = p2Deck.shift();
    console.log(capture9);
    let capture10 = p2Deck.shift();
    console.log(capture10);

    if (capture5.getValue() > capture10.getValue()) {
        p1Discard.unshift(capture2, capture3, capture4, capture5,
            capture7, capture8, capture9, capture10, transferCard1, transferCard2);
        if (p1Discard.length > 10) {
            p1DiscardEl.classList.remove(p1Discard[10].cardFace());
        };
        p1DiscardEl.classList.add(capture10.cardFace());
    } else {
        p2Discard.unshift(capture2, capture3, capture4, capture5,
            capture7, capture8, capture9, capture10, transferCard1, transferCard2);
        if (p2Discard.length > 10) {
            p2DiscardEl.classList.remove(p2Discard[10].cardFace());
        };
        p2DiscardEl.classList.add(capture5.cardFace());
    };

    p1RevealEl.classList.remove('card', transferCard1.cardFace());
    p2RevealEl.classList.remove('card', transferCard2.cardFace());
    console.log(p1Discard);
    console.log(p2Discard);
    console.log(p1Deck);
    console.log(p2Deck);
};

function replenishDeck(inputDeck) {
    let endCount1 = p1Discard.length + p1Deck.length;
    let endCount2 = p2Discard.length + p2Discard.length;

    if (endCount1 < 5) {
        return dialogue.textContent = 'Player 2 wins!';
    } else if (endCount2 < 5) {
        return dialogue.textContent = 'Player 1 wins!';
    } else {
        let cardsLeft = [];

        for (i = 0; i <= inputDeck.length; i++) {
            let tempTransfer = p1Deck[0];
            inputDeck.shift();
            cardsLeft.push(tempTransfer);
        };

        if (p1Deck.length===0) {
            inputDeck = shuffle(p1Discard);
        }else {inputDeck = shuffle(p2Discard)};

        for (i=0; i <= cardsLeft.length; i++) {
            let transferIndex = cardsLeft.length - 1;
            let tempTransfer = cardsLeft[transferIndex];
            cardsLeft.pop();
            inputDeck.unshift(tempTransfer);
        };
    };
};
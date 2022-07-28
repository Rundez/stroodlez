self.onmessage = (e) => {
    const originalDeck = e.data;
    let isSame = false;
    let index = 0

    let shuffledDecks = [];
    while(!isSame) {
        const shuffledDeck = shuffle(originalDeck);
        
        isSame = compare(shuffledDecks, shuffledDeck);
        shuffledDecks.push(shuffledDeck);
        index++;
        if(index % 100 === 0) {
            postMessage({finished: false, tries: index, lastShuffledDeck: shuffledDeck});
        }
    }

    postMessage({finished: true, tries: index});
}

const shuffle = (deck) => {
    const shuffled = deck.slice().sort(() => Math.random() - 0.5);
    return shuffled;
}

const compare = (decks, shuffledDeck) => {
    return decks.some(deck => deck.toString() === shuffledDeck.toString());
}
self.onmessage = (e) => {
    const originalDeck = e.data;
    let isSame = false;
    let index = 0

    while(!isSame) {
        const shuffledDeck = shuffle(originalDeck);
        isSame = shuffledDeck.toString() === originalDeck.toString();
        index++;
        if(index % 100000 === 0) {
            postMessage({finished: false, tries: index})
        }
    }

    postMessage({finished: true, tries: index});
}

const shuffle = (deck) => {
    const shuffled = deck.slice().sort(() => Math.random() - 0.5);
    return shuffled;
}
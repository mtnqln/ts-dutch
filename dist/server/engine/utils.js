export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap
    }
    return array;
}
export function getKeyByValue(map, value) {
    for (const [k, v] of map.entries()) {
        if (JSON.stringify(v) === JSON.stringify(value)) {
            return k;
        }
    }
    return undefined;
}
export function activateQueen(queen, firstDeck, otherDeck) {
    if (queen.deck === "ownDeck") {
        const card = firstDeck.getCard(queen.showCardPosition);
        return card;
    }
    else {
        const card = otherDeck.getCard(queen.showCardPosition);
        return card;
    }
}
export function activateJack(jack, firstDeck, otherDeck) {
    const firstCardPos = jack.swapCardPosition[0];
    const secondCardPos = jack.swapCardPosition[1];
    const firstCard = firstDeck.getCard(firstCardPos);
    const secondCard = otherDeck.getCard(secondCardPos);
    firstDeck.swapCards(firstCardPos, secondCard);
    otherDeck.swapCards(secondCardPos, firstCard);
}
//# sourceMappingURL=utils.js.map
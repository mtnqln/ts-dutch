import { valueCards } from "./cards";
import { getKeyByValue, shuffle } from "./utils";
export class Stack {
    stack;
    constructor() {
        const stack = [];
        const suites = ["hearts", "spades", "diamonds", "clubs"];
        const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        shuffle(suites);
        shuffle(ranks);
        for (const suite of suites) {
            for (const rank of ranks) {
                let value;
                if ((suite == "hearts" || suite == "diamonds") && rank == "K") {
                    value = "RK";
                }
                else if (rank == "K") {
                    value = "BK";
                }
                else {
                    value = null;
                }
                const card = {
                    suite: suite,
                    rank: rank,
                    value: value ? valueCards[value] : valueCards[rank]
                };
                stack.push(card);
            }
        }
        shuffle(stack);
        this.stack = stack;
    }
    draw() {
        if (this.stack.length === 0) {
            throw new Error("Stack is empty !");
        }
        return this.stack.pop();
    }
}
export class Bin {
    bin;
    constructor() { }
    add(cards) {
        cards.map((card) => { this.bin.push(card); });
    }
    draw() {
        if (this.bin.length === 0) {
            throw new Error("Bin is empty, you cannot draw in it");
        }
        return this.bin.pop();
    }
}
export class Deck {
    player;
    cards;
    constructor(player, stack) {
        this.player = player;
        const cards = new Map();
        for (let i = 0; i < 4; i++) {
            if (stack.stack.length > 0) {
                const card = stack.draw();
                console.log("Got card:", card);
                cards.set(i, card);
            }
            else {
                console.log("Stack is empty!");
            }
        }
        this.cards = cards;
    }
    findCardPosition(card) {
        const value = getKeyByValue(this.cards, card);
        return value;
    }
    getCard(cardNumber) {
        const card = this.cards.get(cardNumber);
        if (!card) {
            console.error("Card not found");
            throw new Error("Card not found");
        }
        return card;
    }
    removeCard(cardPosition) {
        if (this.cards.has(cardPosition)) {
            const original = this.cards.get(cardPosition);
            const card = structuredClone(original);
            this.cards.delete(cardPosition);
            return card;
        }
        else {
            console.log("Card to remove from the deck not found");
            throw new Error("Card to remove not found");
        }
    }
    swapCards(cardToSwapPosition, card) {
        if (this.cards.has(cardToSwapPosition)) {
            const original = this.cards.get(cardToSwapPosition);
            const swappedCard = structuredClone(original);
            this.cards.set(cardToSwapPosition, card);
            return swappedCard;
        }
        else {
            console.log("Card to swap from the deck not found");
            throw new Error("Card to swap not found");
        }
    }
    calculateValue() {
        let value = 0;
        for (const card of this.cards) {
            value += card[1].value;
        }
        return value;
    }
}
// To create a deck of CardSlot IDK yet
// class CardSlot{
//     card:Card
// }
//# sourceMappingURL=deck.js.map
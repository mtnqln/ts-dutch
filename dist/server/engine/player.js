import { activateJack, activateQueen } from "./utils";
export class Player {
    player;
    deck;
    said_dutch;
    constructor(player, deck) {
        this.deck = deck;
        this.player = player;
        this.said_dutch = false;
    }
    // To put a card in the bin even when it is not our turn
    playIntermediate(bin, otherDeck, putToBin, activateCard) {
        if (putToBin && putToBin.type === "cardPosition") {
            let cards = [];
            for (let i = 0; i < putToBin.cardsPosition.cardsPosition.length; i++) {
                const card = this.deck.removeCard(putToBin.cardsPosition.cardsPosition[i]);
                cards.push(card);
            }
            // TOCHECK : cards must all be same value + bin top card must also be same value
            bin.add(cards);
            if (activateCard) {
                const arrayIfQueen = [];
                for (const cards of activateCard) {
                    if (cards.type === "queen") {
                        arrayIfQueen.push(activateQueen(cards.queen, this.deck, otherDeck));
                    }
                    else if (cards.type === "jack") {
                        activateJack(cards.jack, this.deck, otherDeck);
                    }
                }
                if (activateCard[0].type === "queen") {
                    return arrayIfQueen;
                }
            }
        }
    }
    // Classic play 
    play(stack, bin, otherDeck, choice) {
        if (choice && choice.type === "draw") {
            // We draw either in the stack or the bin :
            if (choice.draw.place === "Stack") {
                const cardDrawed = stack.draw();
                return cardDrawed;
            }
            else {
                const cardDrawed = bin.draw();
                return cardDrawed;
            }
        }
        if (choice && choice.type === "handleCard") {
            if (choice.handleCard.type === "changeCard") {
                const cardPosition = this.deck.findCardPosition(choice.handleCard.bufferedCard);
                if (!cardPosition) {
                    console.log("Card position not found");
                    throw new Error("Card position not found");
                }
                this.deck.swapCards(cardPosition, choice.handleCard.bufferedCard);
            }
        }
        if (choice && choice.type === "activateCard") {
            if (choice.activateCard.type === "queen") {
                activateQueen(choice.activateCard.queen, this.deck, otherDeck);
            }
            if (choice.activateCard.type === "jack") {
                activateJack(choice.activateCard.jack, this.deck, otherDeck);
            }
        }
    }
    calculateValue() {
        return this.deck.calculateValue();
    }
}
//# sourceMappingURL=player.js.map
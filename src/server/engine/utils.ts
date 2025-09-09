import { Card } from "./cards";
import { Deck } from "./deck";
import { ActivateCard, Jack, PlayerChoice, Queen } from "./turn";

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // swap
  }
  return array;
}

export function getKeyByValue<K,V>(map:Map<K,V>,value:V):K | undefined{
  for (const [k,v] of map.entries()){
    if (JSON.stringify(v)===JSON.stringify(value)){
      return k;
    }
  }
  return undefined
}

export function activateQueen(queen:Queen,firstDeck:Deck,otherDeck:Deck):Card{
    if (queen.deck==="ownDeck"){
      const card = firstDeck.getCard(queen.showCardPosition);
      return card
  } else {
      const card = otherDeck.getCard(queen.showCardPosition);
      return card
  }
}

export function activateJack(jack:Jack,firstDeck:Deck,otherDeck:Deck){
  const firstCardPos = jack.swapCardPosition[0];
  const secondCardPos = jack.swapCardPosition[1];

  const firstCard = firstDeck.getCard(firstCardPos);
  const secondCard = otherDeck.getCard(secondCardPos);

  firstDeck.swapCards(firstCardPos,secondCard);
  otherDeck.swapCards(secondCardPos,firstCard);
}
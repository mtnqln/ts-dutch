// export type PlayerChoice = Draw | HandleCard | ActivateCard

import { Card } from "./cards";

export type PlayerChoice =
    { type: "draw"; draw: Draw}
  | { type: "handleCard"; handleCard: HandleCard }
  | { type: "activateCard"; activateCard: ActivateCard }
    //   Case where you put one of your cards to the bin when it is not your turn
  | { type: "putToBin"; putToBin: PutToBin, activateCard?:ActivateCard[]};

export interface Draw {
    place: "Stack" | "Bin";
}

// export type HandleCard = ChangeCard | DoNothing;
export type HandleCard = 
    {type:"changeCard"; changeCard: ChangeCard, bufferedCard: Card}
    | {type:"doNothing", bufferedCard:Card}

type DoNothing = {};

interface ChangeCard {
    cardPosition: number
    // To put some cards to the bin
    putToBin: PutToBin
}

export type PutToBin = 
    {type:"cardPosition", cardsPosition:CardsPosition}
    | {type: "doNothing"};

interface CardsPosition {
    cardsPosition : number[]
}

export type ActivateCard = 
    {type: "jack", jack:Jack}
    | {type:"queen", queen:Queen}

export interface Queen {
    showCardPosition: number
    deck: "ownDeck" | "opponentDeck"
}

export interface Jack {
    // First position : card in our deck | Second position : card in opponent deck
    swapCardPosition: [number,number];
}

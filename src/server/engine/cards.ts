export type Suite = "hearts" | "spades" | "diamonds" | "clubs"; 

export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

export type RankAndValue = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "RK" | "BK";

export const valueCards = {
  RK:0, A:1,2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, J:11, Q: 12, BK: 13
}

export type Card = {
    suite: Suite,
    rank: Rank,
    value: number,
};


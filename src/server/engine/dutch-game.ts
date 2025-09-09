import { Bin, Deck, Stack } from "./deck";
import { Player } from "./player";
import { PlayerChoice } from "./turn";

export class Game {
    private state:GameState

    constructor(player1:string,player2:string){
        const stack = new Stack();
        const bin = new Bin();
        const deck_player1 = new Deck(player1, stack);
        const deck_player2 = new Deck(player2, stack);
        const player11 = new Player(player1, deck_player1);
        const player22 = new Player(player2, deck_player2);

        const state:GameState = {
            player1: player11,
            player2: player22,
            deck_player1,
            deck_player2,
            stack,
            bin,
            to_play: "player1",
            state: [true, true]
        };

        this.state = state;

    }

    get_state():GameState{
        return this.state
    }

    update_state(gameState: GameState) {
        this.state = gameState;
    }

    play_once(){}

    calculate_win():[string,number]{
        const value_player1 = this.state.player1.calculateValue();
        const value_player2 = this.state.player2.calculateValue();
        if (value_player1<value_player2){
            return [this.state.player1.player,value_player1]
        } else if ( value_player1 > value_player2){
            return [this.state.player2.player,value_player2]
        } else {
            // In case of an equality
            return ["",value_player1]
        }
    }

    play_game(game_state: GameState | undefined,input?:PlayerChoice):GameState | [string,number]{
        if (game_state && game_state.state[0] === false && game_state.state[1] === false){
            return this.calculate_win();
        }
        if (!game_state){
            this.state.player1.play(this.state.stack,this.state.bin,this.state.deck_player2);
            if (input?.type==="putToBin"){
                this.state.player2.playIntermediate(this.state.bin,this.state.deck_player1,input.putToBin,input.activateCard ? input.activateCard : undefined);
            }
            const new_game_state:GameState =  {
                player1: this.state.player1,
                player2: this.state.player2,
                deck_player1: this.state.deck_player1,
                deck_player2: this.state.deck_player2,
                stack: this.state.stack,
                bin: this.state.bin,
                to_play: "player2",
                state:[true,true]
            }
            this.update_state(new_game_state);
            return new_game_state
        } else if(game_state.state[0] === false){
            if (game_state.to_play === "player1"){
                game_state.player1.play(game_state.stack,game_state.bin,this.state.deck_player2,input)
                if (input?.type === "putToBin"){
                    this.state.player2.playIntermediate(this.state.bin,this.state.deck_player1,input.putToBin,input.activateCard ? input.activateCard : undefined);
                }
                game_state.state[1]=false;
                this.update_state(game_state);
            } else {
                game_state.player2.play(game_state.stack,game_state.bin,this.state.deck_player1)
                if (input?.type==="putToBin"){
                    this.state.player1.playIntermediate(this.state.bin,this.state.deck_player2,input.putToBin,input.activateCard ? input.activateCard : undefined);
                }
                game_state.state[1]=false;
                this.update_state(game_state);
            }
            return game_state
        }
        else {
            if (game_state.to_play === "player1"){
                game_state.player1.play(game_state.stack,game_state.bin,this.state.deck_player2);
                if (input?.type==="putToBin"){
                    this.state.player2.playIntermediate(this.state.bin,this.state.deck_player1,input.putToBin,input.activateCard ? input.activateCard : undefined);
                }
                game_state.to_play = "player2";
                game_state.state[0] = game_state.player1.said_dutch;
            } else {
                game_state.player2.play(game_state.stack,game_state.bin,this.state.deck_player1);
                if (input?.type==="putToBin"){
                    this.state.player1.playIntermediate(this.state.bin,this.state.deck_player2,input.putToBin,input.activateCard ? input.activateCard : undefined);
                }                game_state.to_play = "player1"; 
                game_state.state[0] = game_state.player1.said_dutch;
            }
            this.update_state(game_state);
            return game_state
        }
    }
}

export type GameState = {
    player1: Player,
    player2: Player,
    deck_player1:Deck,
    deck_player2: Deck,
    stack: Stack,
    bin: Bin,
    to_play: "player1" | "player2",
    state:[boolean,boolean], // if the game is still going
}
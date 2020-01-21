import { Test } from "./test/testRepo.js";
import { Dice } from "./models/dice.js";
import { Game } from "./models/game.js";
import { Player } from "./models/player.js";
import { Common } from "./common/common.js";
import * as $ from "/js/jquery.min.js";


export class Main{
    constructor(){
        try{
            jQuery.get("/players", function (data){
                let players = [];
                data.players.filter(name => name !== '')
                .forEach((player, index) => players.push(new Player(player, index)));
                let game = new Game(players);
            });
            // console.log(players);
        }catch(err){
            console.log(err.stack)
        }
        // let formData = JSON.parse(Common.getCookie('players-data'));
        // console.log(playersInput);
    }
}

let main = new Main();
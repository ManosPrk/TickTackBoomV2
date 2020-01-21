import { Repo } from "./repo.js";
import { Bomb } from "./bomb.js";
import { Dice } from "./dice.js";
import { Player } from "./player.js";
import { Round } from "./round.js";
import { Common } from "../common/common.js";

export class Game{
    constructor(players){
        this.randomTime = () => { return Math.floor(Math.random() * (40 - 10) + 10)};
        this.cards = Common.shuffle(Repo.getCards(2));
        this.currentCard;
        this.cardDrawn = false;
        this.bomb = new Bomb();
        this.dice = new Dice();
        this.players = players;
        this.diceEle = document.getElementById('dice');
        this.cardEle = document.getElementById('card');
        this.bombEle = document.getElementById('bomb');
        this.stadingsEle = document.getElementById('standings');
        this.standingsModalEle = document.getElementById('standings-modal');
        this.selectLoserEle = document.getElementById('select-loser');
        this.loserModalEle = document.getElementById('select-loser-modal');
        this.cardsLeftEle = document.getElementById('cards-left');
        this.players.forEach(player => this.createPlayerElement(player));
        let instance = this;
        this.showCardsLeft();

        this.diceEle.addEventListener('click', function(){
            instance.dice.roll(instance.intervalLoop);
        })

        this.cardEle.addEventListener('click', function(){
            instance.getCard();
        })

        this.bombEle.addEventListener('click', function(){
            instance.newRound();
        })

        this.standingsModalEle.addEventListener('click', function(){
            this.style.display = 'none';
            instance.resetGameState();
        })
        
    }

    createPlayerElement(player){

        let playerElement = document.createElement('li');
        playerElement.classList.add('player-element');
        playerElement.classList.add('noselect');
        playerElement.textContent = `${player.name}`;
        playerElement.addEventListener('click', function(){
            player.cardsTaken++;
            this.loserModalEle.style.display = 'none';
            if (this.cards.length === 0){
                this.getStandings();
            }
        }.bind(this))
        this.selectLoserEle.appendChild(playerElement);
    }

    intervalLoop(foo){
        var count = setInterval(timer, 100)
        var timesPassed = 0;
        function timer(){
            if (timesPassed === 10){
                clearInterval(count);
                return;
            }
            else{
                foo();
            }
            timesPassed++;
        }
    }

    getCard(){
        if (!this.cardDrawn){
            this.cardEle.querySelector("#syllable").textContent = this.cards.shift().name;
            this.showCardsLeft();
            this.cardDrawn = true;
        }else{
            alert('You have already drawn a card')
        }
    }

    showCardsLeft(){
        this.cardsLeftEle.textContent = `Cards Left: ${this.cards.length}`;
    }
    

    resetGameState(){
        this.standingsModalEle.display = 'none';
        this.stadingsEle.innerHTML = '';
        this.cards = Repo.getCards();
        this.players.forEach(player =>{
            player.reset();
        })
    }

    resetRoundState(){
        this.dice.reset();
        this.cardDrawn = false;
        this.bomb.reset();
    }

    newRoundConditionsMet(){
        let conditionsMet = true;
        if (!this.cardDrawn){
            alert('Please draw card before you start a new round');
            conditionsMet = false;
        }
        if (!this.dice.rolled){
            alert('Please roll the dice before you start a new round');
            conditionsMet = false;
        }
        return conditionsMet;
    }

    newRound(){
        if (this.newRoundConditionsMet() && !this.bomb.ticking){
            this.bomb.startTimer(this.randomTime(), this);
        }
    }

    showSelectLoserModal(){
        this.loserModalEle.style.display = 'flex';
        this.resetRoundState();
    }



    getStandings(){
        this.players.sort((a, b) => (b.cardsTaken > a.cardsTaken) ? 1: -1);
        this.players.forEach((player, index) => {
            if (index === 0){
                let loserHeader = document.createElement('h1');
                loserHeader.classList.add('modal-header');
                loserHeader.textContent = `${player.name} Lost!`;
                this.stadingsEle.appendChild(loserHeader);
            }
            let listItem = document.createElement('li');
            listItem.classList.add('standings-list-items');
            listItem.textContent = `${player.name}, rounds lost: ${player.cardsTaken}`;
            this.stadingsEle.appendChild(listItem);
        });
        this.standingsModalEle.style.display = 'flex';
    }


}
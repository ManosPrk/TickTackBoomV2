import {Repo} from './repo.js';
import { Common } from '../common/common.js';

export class Dice{
    constructor(){
        this.sides = Repo.getSides();
        this.rolled = false;
    }
    
    roll(interval){
        if (!this.rolled){
            interval(this.getFirstSide.bind(this));
            this.rolled = true;
        }
        else{
            alert('you have already rolled the dice');
        }
    }

    getFirstSide(){
        let shuffledSides = Common.shuffle(this.sides);
        document.getElementById('side').textContent = shuffledSides[0].name;
    }

    reset(){
        this.rolled = false;
        this.sides = Repo.getSides();
    }
}
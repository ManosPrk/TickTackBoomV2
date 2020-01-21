import { Repo } from '../models/repo.js';
import { Common } from '../common/common.js';

export class Test{
    constructor(){
        this.sides = Repo.getSides();
    }

    roll(){
        return Common.shuffle(this.sides)[0].literalValue;
    }
}
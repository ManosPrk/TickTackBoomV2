import { Entity } from "./entity.js";

export class Player extends Entity{
    constructor(name, id){
        super(name, id);
        this.cardsTaken = 0;
        
    }

    reset(){
        this.cardsTaken = 0;
    }


}
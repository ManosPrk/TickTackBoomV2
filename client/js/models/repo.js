import {Entity} from './entity.js';

export class Repo{

    static getEntities(arr){
        let entities = [];
        arr.forEach((s, index) => entities.push(new Entity(s, index)));
        return entities;
    }

    static getCards(numberOfCards){
        let syllables = ['ΜΟ', 'ΜΟΥ', 'ΙΜΙ', 'ΛΟ', 'ΞΟ', 'ΡΟ', 'ΣΟΥ', 'ΠΟΥ', 'ΛΟΥ', 'ΚΑ'];
        if (!!numberOfCards){
            return this.getEntities(syllables).slice(0, numberOfCards);
        }
        else{
            return this.getEntities(syllables).slice(0, syllables.length);
        }
        
        
    }

    static getSides(){
        let sideText = ['Tick', 'Tack', 'Boom'];
        return this.getEntities(sideText);
    }
}
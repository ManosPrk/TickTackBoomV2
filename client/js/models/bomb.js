import { Common } from "../common/common.js";


export class Bomb{
    constructor(){
        this.tickingSoundpath = 'audio/tick.mp3';
        this.explodingSoundpath = 'audio/boom.mp3';
        this.ticking = false;
        this.exploded = true;
    }
    
    startTimer(randomExplodingTime, game){
        let bombTickAudio = Common.createAudioElement(this.tickingSoundpath, true);
        randomExplodingTime = 0.5;
        bombTickAudio.loop = true;
        let bombExplodingAudio = Common.createAudioElement(this.explodingSoundpath, false);
       
        new Promise((res, rej) => {
            bombTickAudio.play().then(() =>{
                this.ticking = true;
                setTimeout(() => {
                    bombTickAudio.pause();
                    bombExplodingAudio.play();
                    this.exploded = true;
                    game.showSelectLoserModal();
                }, randomExplodingTime * 1000);
            })
        })
    }

    reset(){
        this.ticking = false;
        this.exploded = true;
    }
}
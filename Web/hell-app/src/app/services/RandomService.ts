import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
 })

 export class RandomService {
    
    constructor(){}

    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomPercent(maxPercent: number){
        return this.getRandomInt(0, maxPercent) / 100;
    }
 }
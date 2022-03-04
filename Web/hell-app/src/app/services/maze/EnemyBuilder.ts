import { Injectable } from "@angular/core";
import { IEnemy } from "src/app/models/enemies/IEnemy";

@Injectable({
    providedIn: 'root'
})


export class EnemyBuilder {
    private epithets: string[] = ["Злобный", "мерзкий", "усталый", "ехидный"];

    buildGoblin(): IEnemy {
        const goblin = this.buildEnemy(
            1, 2, //strength
            6, 9, //dexterity
            2, 3, //luck
            10, 15, //stamina
            1, 3
        );
        goblin.name = `${this.getRandonFromArray(this.epithets)} гоблин`;
        return goblin;
    }

    private buildEnemy(
        strengthMin: number,
        strengthMax: number,
        dexterityMin: number,
        dexterityMax: number,
        luckMin: number,
        luckMax: number,
        staminaMin: number,
        staminaMax: number,
        rewardCoinsMin: number,
        rewardCoinsMax: number,): IEnemy {
        const enemy = {
            strength: this.getRandomInt(strengthMin, strengthMax),
            dexterity: this.getRandomInt(dexterityMin, dexterityMax),
            luck: this.getRandomInt(luckMin, luckMax),
            stamina: this.getRandomInt(staminaMin, staminaMax),
            rewardCoins: this.getRandomInt(rewardCoinsMin, rewardCoinsMax),
        } as IEnemy;
        enemy.maxStamina = enemy.stamina;

        return enemy;
    }

    private getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private getRandonFromArray<T>(array: T[]): T {
        const randomIndex = this.getRandomInt(0, array.length - 1);
        return array[randomIndex];
    }
}
import { Injectable } from "@angular/core";
import { MazeStatus } from "src/app/enum/MazeStatus";
import { IEnemy } from "src/app/models/enemies/IEnemy";
import { IHero } from "src/app/models/IHero";
import { ICharacteristics } from "../../models/ICharacteristics";
import { GameEventsService } from "../GameEventsService";
import { RandomService } from "../RandomService";

@Injectable({
    providedIn: 'root'
})

export class FightHelper {
    public PercentRandomSpan: number = 5;
    constructor(
        private gameEventsService: GameEventsService,
        private randomService: RandomService) { }

    fightAgainstEnemiesAutoBatle(hero: IHero, enemies: IEnemy[]) {
        this.gameEventsService.addHeroPhrase(hero, `Да тут ${enemies.length} гоблинов. Надеюсь справлюсь`);

        while (enemies.length > 0) {
            this.fightRoundWithAllEnemies(hero, enemies);
        }
    }

    fightRoundWithAllEnemies(hero: IHero, enemies: IEnemy[]) {
        this.gameEventsService.addHeroPhrase(hero, `${enemies.length} противников. Надеюсь справлюсь`);

        for (let index = 0; index < enemies.length; index++) {
            const enemy = enemies[index];
            const enemyStillALive = this.fightRound(hero, enemy);
            if (!enemyStillALive) {
                this.gameEventsService.addHeroPhrase(hero, `Наконец я убил этого ${enemy.name} и нашёл у него ${enemy.rewardCoins} монет`);
                hero.coins += enemy.rewardCoins;
                enemies.splice(index, 1);
                index--;
            }
        }

        if (enemies.length <= 0) {
            hero.maze.status = MazeStatus.InProgress;
            hero.maze.levels[hero.maze.heroCurrentLevelNumber].activeRoom = null;
        }
    }

    /**
     * @returns {boolean} true if enemy still alive and we need one more round
     */
    fightRound(hero: IHero, enemy: IEnemy): boolean {
        this.gameEventsService.addSystemMessage(`${hero.name} атакует ${enemy.name}`);
        this.attack(hero, hero.name, enemy, enemy.name);
        if (enemy.stamina > 0) {
            this.gameEventsService.addSystemMessage(`${enemy.name} всё ещё жив и бьёт в ответ`);
            this.attack(enemy, enemy.name, hero, hero.name);
        }

        return enemy.stamina > 0;
    }

    private attack(attacker: ICharacteristics, attackerName: string, defender: ICharacteristics, defenderName: string) {
        const randomFrom1To100 = this.randomService.getRandomInt(1, 100) / 100;
        const isAttackerFatser = attacker.dexterity > defender.dexterity;

        let chanseToHit = isAttackerFatser
            ? defender.dexterity / attacker.dexterity
            : 1 - attacker.dexterity / defender.dexterity;
        const spanRandom = this.randomService.getRandomPercent(this.PercentRandomSpan);
        chanseToHit += spanRandom;
        chanseToHit = Math.round(chanseToHit * 100) / 100;
        const isHitted = randomFrom1To100 < chanseToHit;

        this.gameEventsService.addSystemMessage(`Бросок кубика ${randomFrom1To100}. Шанс на удар ${chanseToHit} A:${attacker.dexterity} D:${defender.dexterity}`);

        if (isHitted) {
            defender.stamina -= attacker.strength;
            this.gameEventsService.addSystemMessage(`${attackerName} попал. ${defenderName} теряет ${attacker.strength} выносливость`);
        } else {
            this.gameEventsService.addSystemMessage(`${attackerName} промахнулся`);
        }
    }
}

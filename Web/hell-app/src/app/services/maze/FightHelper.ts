import { Injectable } from "@angular/core";
import { MazeStatus } from "src/app/enum/MazeStatus";
import { IEnemy } from "src/app/models/enemies/IEnemy";
import { IHero } from "src/app/models/IHero";
import { ICharacteristics } from "../../models/ICharacteristics";
import { GameEventsService } from "../GameEventsService";

@Injectable({
    providedIn: 'root'
})

export class FightHelper {
    public GoblinCoins: number = 2;
    constructor(private gameEventsService: GameEventsService) { }

    fightAgainstEnemiesAutoBatle(hero: IHero, enemies: IEnemy[]) {
        this.gameEventsService.addHeroPhrase(hero, `Да тут ${enemies.length} гоблинов. Надеюсь справлюсь`);

        while (enemies.length > 0) {
            this.fightRoundWithAllEnemies(hero, enemies);
        }
    }

    fightRoundWithAllEnemies(hero: IHero, enemies: IEnemy[]) {
        this.gameEventsService.addHeroPhrase(hero, `${enemies.length} противников. Надеюсь справлюсь`);

        for (let index = 0; index < enemies.length; index++) {
            const goblin = enemies[index];
            const stillALive = this.fightRound(hero, goblin);
            if (!stillALive) {
                this.gameEventsService.addHeroPhrase(hero, `Наконец я убил этого ${goblin.name}`);
                enemies.splice(index, 1);
                index--;
                hero.coins += this.GoblinCoins;
            }
        }

        if (enemies.length <= 0){
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

        const random = Math.random();
        const isAttackerFatser = attacker.dexterity > defender.dexterity;
        const chanseToHit = isAttackerFatser
            ? defender.dexterity / attacker.dexterity
            : 1 - attacker.dexterity / defender.dexterity;

        const isHitted = random < chanseToHit;

        this.gameEventsService.addSystemMessage(`Бросок кубика ${random}. Шанс на удар ${chanseToHit}`);

        if (isHitted) {
            defender.stamina -= attacker.strength;
            this.gameEventsService.addSystemMessage(`${attackerName} попал. ${defenderName} теряет ${attacker.strength} выносливость`);
        } else {
            this.gameEventsService.addSystemMessage(`${attackerName} промахнулся`);
        }
    }
}

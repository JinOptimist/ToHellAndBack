import { IHero } from "../IHero";
import { BaseRooms } from "./BaseRooms";

export class GoblinNestRoom extends BaseRooms {
    roomName: string;

    constructor(private goblinCount: number) { 
        super(); 
        this.roomName = `Гнездо гоблинов (+${goblinCount})`;
    }

    exploreRoom(hero: IHero): void {
        hero.stamina -= this.goblinCount;
        hero.coins += this.goblinCount * 2;
    }
}
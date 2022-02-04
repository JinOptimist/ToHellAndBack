import { IHero } from "../IHero";
import { BaseRooms } from "./BaseRooms";

export class TreasuryRoom extends BaseRooms {
    roomName: string;

    constructor(private coinsCount: number) { 
        super(); 
        this.roomName = `Сокровищница (+${coinsCount})`
    }

    exploreRoom(hero: IHero): void {
        hero.coins += this.coinsCount;
        hero.stamina--;
    }
}
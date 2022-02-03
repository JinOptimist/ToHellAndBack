import { IHero } from "../IHero";
import { BaseRooms } from "./BaseRooms";

export class TreasuryRoom extends BaseRooms {
    roomName: string = "Сокровищница";

    constructor(private coinsCount: number) { super(); }

    exploreRoom(hero: IHero): void {
        hero.coins += this.coinsCount;
        hero.stamina--;
    }
}
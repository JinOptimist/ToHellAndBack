import { IHero } from "../IHero";
import { BaseRooms } from "./BaseRooms";

export class EmptyRoom extends BaseRooms {
    roomName: string = "Пустая комната";

    exploreRoom(hero: IHero): void {
        console.log('do nothing');
        hero.stamina--;
    }
}
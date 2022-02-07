import { IHero } from "../IHero";
import { BaseRooms } from "./BaseRooms";

export class EmptyRoom extends BaseRooms {
    roomName: string = "Пустая комната";

    exploreRoom(hero: IHero): void {
        //do nothing
        hero.stamina--;
    }
}
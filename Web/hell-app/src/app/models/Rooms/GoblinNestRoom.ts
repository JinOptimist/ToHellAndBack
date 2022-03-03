import { IHero } from "../IHero";
import { BaseRooms } from "./BaseRooms";
import { RoomType } from "../../enum/RoomType";
import { IEnemy } from "../enemies/IEnemy";

export class GoblinNestRoom extends BaseRooms {
    roomType: RoomType = RoomType.GoblinNestRoom;
    roomName: string;
    roomDesc: string;

    constructor(goblins: IEnemy[]) {
        super();
        this.enemies = goblins;

        this.roomName = `Гнездо гоблинов (+${goblins.length})`;

        let volume: string;
        if (goblins.length < 5) {
            volume = 'Звуки едва слышны';
        } else if (goblins.length < 10) {
            volume = 'Звуки отчётливо слышны';
        } else {
            volume = 'Регялярны слышны звуки борьбы';
        }

        this.roomDesc = "По ту сторону двери копошаться маленькие лапки. " + volume;
    }
}
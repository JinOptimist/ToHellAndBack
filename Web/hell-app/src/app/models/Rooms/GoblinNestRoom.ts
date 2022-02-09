import { IHero } from "../IHero";
import { BaseRooms } from "./BaseRooms";
import { RoomType } from "./RoomType";

export class GoblinNestRoom extends BaseRooms {
    roomType: RoomType = RoomType.GoblinNestRoom;
    roomName: string;
    roomDesc: string;

    constructor(public goblinCount: number) {
        super();
        this.roomName = `Гнездо гоблинов (+${goblinCount})`;
        
        let volume: string;
        if (goblinCount < 5) {
            volume = 'Звуки едва слышны';
        } else if (goblinCount < 10) {
            volume = 'Звуки отчётливо слышны';
        } else {
            volume = 'Регялярны слышны звуки борьбы';
        }
        this.roomDesc = "По ту сторону двери копошаться маленькие лапки. " + volume;
    }
}
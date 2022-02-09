import { RoomType } from "../../enum/RoomType";

export abstract class BaseRooms {
     abstract roomName: string;
     abstract roomType: RoomType;
     abstract roomDesc: string;
}
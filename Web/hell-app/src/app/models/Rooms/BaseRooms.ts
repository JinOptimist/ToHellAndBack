import { RoomType } from "./RoomType";

export abstract class BaseRooms {
     abstract roomName: string;
     abstract roomType: RoomType;
     abstract roomDesc: string;
}
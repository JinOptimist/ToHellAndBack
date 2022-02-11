import { ICharacteristics } from "./ICharacteristics";
import { IMaze } from "./IMaze";

export interface IHero extends ICharacteristics {
    name: string;
    coins: number;
    staminCostToAvoidRoom: number;
    maze: IMaze;
}
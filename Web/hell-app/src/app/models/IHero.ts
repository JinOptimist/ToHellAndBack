import { ICharacteristics } from "./ICharacteristics";
import { IMaze } from "./IMaze";

export interface IHero {
    name: string;
    coins: number;
    staminCostToAvoidRoom: number;
    maze: IMaze;

    characteristics: ICharacteristics;
}
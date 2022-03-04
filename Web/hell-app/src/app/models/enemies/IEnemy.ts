import { ICharacteristics } from "../ICharacteristics";

export interface IEnemy extends ICharacteristics {
    name: string;
    rewardCoins: number;
}

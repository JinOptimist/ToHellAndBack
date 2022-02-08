import { IMazeLevel } from "./IMazeLevel";

export interface IMaze {
    levels: IMazeLevel[];
    heroCurrentLevelNumber: number;
    
    //will decrease after each maze level generation
    mazePowerBalance: number;
}
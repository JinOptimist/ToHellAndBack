import { IMazeLevel } from "./IMazeLevel";

export interface IMaze {
    levels: IMazeLevel[];
    
    //will decrease after each maze level generation
    mazePowerBalance: number;
}
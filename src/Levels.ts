import { ILevel } from './types/Vector';

let id = 0;
export enum LEVEL_TYPES {
    MARVEL = id++,
    LANDSCAPE = id++,
}

export const Levels: Partial<Record<LEVEL_TYPES, ILevel>> = {
    [LEVEL_TYPES.MARVEL]: {
        width: 5,
        height: 5,
        gridSize: 100,
        path: 'images/marvel',
    },
    [LEVEL_TYPES.LANDSCAPE]: {
        width: 8,
        height: 5,
        gridSize: 75,
        path: 'images/landscape',
    },
};

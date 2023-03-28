import { ILevel } from './types/Vector';

let id = 0;
export enum LEVEL_TYPES {
    MASK = id++,
    PORTRAIT = id++,
    SWIRL = id++,
}

export const Levels: Partial<Record<LEVEL_TYPES, ILevel>> = {
    [LEVEL_TYPES.MASK]: {
        width: 4,
        height: 6,
        gridSize: 75,
        time: 4 * 6 * 10,
        path: 'images/mask',
    },
    [LEVEL_TYPES.PORTRAIT]: {
        width: 6,
        height: 7,
        gridSize: 65,
        time: 6 * 7 * 10,
        path: 'images/portrait',
    },
    [LEVEL_TYPES.SWIRL]: {
        width: 6,
        height: 8,
        gridSize: 75,
        time: 6 * 7 * 10,
        path: 'images/swirl',
    },
};

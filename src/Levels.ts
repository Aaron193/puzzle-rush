import { ILevel } from './types/Vector';

let id = 0;
export enum LEVEL_TYPES {
    MASK = id++,
    MASK_MED = id++,
    MASK_HARD = id++,
    PORTRAIT = id++,
    PORTRAIT_MED = id++,
    PORTRAIT_HARD = id++,
    SWIRL = id++,
    SWIRL_MED = id++,
    SWIRL_HARD = id++,
}

export const Levels: Partial<Record<LEVEL_TYPES, ILevel>> = {
    [LEVEL_TYPES.MASK]: {
        width: 4,
        height: 6,
        gridSize: 75,
        time: 4 * 6 * 10,
        path: 'images/mask',
    },
    [LEVEL_TYPES.MASK_MED]: {
        width: 4,
        height: 6,
        gridSize: 75,
        time: 4 * 6 * 7,
        path: 'images/mask',
    },
    [LEVEL_TYPES.MASK_HARD]: {
        width: 4,
        height: 6,
        gridSize: 75,
        time: 4 * 6 * 5,
        path: 'images/mask',
    },
    [LEVEL_TYPES.PORTRAIT]: {
        width: 6,
        height: 7,
        gridSize: 65,
        time: 6 * 7 * 10,
        path: 'images/portrait',
    },
    [LEVEL_TYPES.PORTRAIT_MED]: {
        width: 6,
        height: 7,
        gridSize: 65,
        time: 6 * 7 * 7,
        path: 'images/portrait',
    },
    [LEVEL_TYPES.PORTRAIT_HARD]: {
        width: 6,
        height: 7,
        gridSize: 65,
        time: 6 * 7 * 5,
        path: 'images/portrait',
    },
    [LEVEL_TYPES.SWIRL]: {
        width: 6,
        height: 8,
        gridSize: 75,
        time: 6 * 8 * 10,
        path: 'images/swirl',
    },
    [LEVEL_TYPES.SWIRL_MED]:{
        width: 6,
        height: 8,
        gridSize: 75,
        time: 6 * 8 * 7, //FIX LATER 
        path: 'images/swirl',
    },
    [LEVEL_TYPES.SWIRL_HARD]:{
        width: 6,
        height: 8,
        gridSize: 75,
        time: 6 * 8 * 5, //FIX LATER 
        path: 'images/swirl',
    },
};

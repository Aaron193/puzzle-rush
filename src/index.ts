// import { Grid } from './Grid.js';
import { Game } from './Game';
import { Levels, LEVEL_TYPES } from './Levels';

var game = new Game();
export function easy(){
    game.levelArray[0] = Levels[LEVEL_TYPES.MASK];
    game.levelArray[1] = Levels[LEVEL_TYPES.PORTRAIT];
    game.levelArray[2] = Levels[LEVEL_TYPES.SWIRL];
    game.exitHomepage();
    game.startGame();
}
export function medium(){
    game.levelArray[0] = Levels[LEVEL_TYPES.MASK_MED];
    game.levelArray[1] = Levels[LEVEL_TYPES.PORTRAIT_MED];
    game.levelArray[2] = Levels[LEVEL_TYPES.SWIRL_MED];
    game.exitHomepage();
    game.startGame();
}
export function hard(){
    game.levelArray[0] = Levels[LEVEL_TYPES.MASK_HARD];
    game.levelArray[1] = Levels[LEVEL_TYPES.PORTRAIT_HARD];
    game.levelArray[2] = Levels[LEVEL_TYPES.SWIRL_HARD];
    game.exitHomepage();
    game.startGame();
}
export function restart(){
    game.exitHomepage();
    game.enterHomepage();
}
document.getElementById("easy").addEventListener("click", easy)
document.getElementById("medium").addEventListener("click", medium)
document.getElementById("hard").addEventListener("click", hard)


import { GRID_SIZE } from './Game';
import { PuzzlePiece } from './PuzzlePiece';

export class PuzzleGrid {
    width: number;
    height: number;
    private grid: PuzzlePiece[];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.grid = new Array(width * height);
    }

    setTile(x: number, y: number, piece: PuzzlePiece): void {
        x = Math.floor(x / GRID_SIZE);
        y = Math.floor(y / GRID_SIZE);
        const index = x + y * this.width;
        this.grid[index] = piece;
    }

    getTile(x: number, y: number): PuzzlePiece {
        x = Math.floor(x / GRID_SIZE);
        y = Math.floor(y / GRID_SIZE);
        const index = x + y * this.width;
        return this.grid[index];
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                ctx.save();
                ctx.globalAlpha = 0.5;
                ctx.strokeStyle = 'white';
                ctx.strokeRect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
                ctx.restore();
            }
        }
    }
}

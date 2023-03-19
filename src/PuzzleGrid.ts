import { Constants } from './Constants';
import { GRID_SIZE } from './Game';
import { PuzzlePiece } from './PuzzlePiece';
import { Vector2 } from './types/Vector';

export class PuzzleGrid {
    width: number;
    height: number;
    position: Vector2;
    private grid: PuzzlePiece[];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.grid = new Array(width * height);
        this.position = {
            x: Constants.canvas.width * 0.5 - width * GRID_SIZE * 0.5,
            y: Constants.canvas.height * 0.5 - height * GRID_SIZE * 0.5,
        };
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
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        const step = GRID_SIZE;

        const width = this.width;
        const height = this.height;
        // horizontals
        for (let i = 0; i < height - 1; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, 0 + i * step + step);
            ctx.lineTo(width * step, 0 + i * step + step);
            ctx.stroke();
            ctx.restore();
        }
        // vertical's
        for (let i = 0; i < width - 1; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0 + i * step + step, 0);
            ctx.lineTo(0 + i * step + step, height * step);
            ctx.stroke();
            ctx.restore();
        }
        ctx.restore();
    }
}

import { Constants } from './Constants';
import { PuzzlePiece } from './PuzzlePiece';
import { ILevel, Vector2 } from './types/Vector';

export class PuzzleGrid {
    width: number;
    height: number;
    gridSize: number;
    position: Vector2;
    private grid: PuzzlePiece[];

    constructor(level: ILevel) {
        const { width, height, gridSize } = level;

        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
        this.grid = new Array(width * height);
        this.position = {
            x: Constants.canvas.width * 0.5 - width * this.gridSize * 0.5,
            y: Constants.canvas.height * 0.5 - height * this.gridSize * 0.5,
        };
    }

    setTile(x: number, y: number, piece: PuzzlePiece): void {
        x = Math.floor(x / this.gridSize);
        y = Math.floor(y / this.gridSize);
        const index = x + y * this.width;
        this.grid[index] = piece;
    }

    getTile(x: number, y: number): PuzzlePiece {
        x = Math.floor(x / this.gridSize);
        y = Math.floor(y / this.gridSize);
        const index = x + y * this.width;
        return this.grid[index];
    }

    getTileAtIndex(index: number): PuzzlePiece {
        return this.grid[index];
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);

        // fill background
        ctx.save();
        ctx.fillStyle = Constants.Colors.gridFill;
        ctx.beginPath();
        ctx.strokeStyle = Constants.Colors.gridBoarder;
        ctx.lineWidth = 15;
        ctx.roundRect(0, 0, this.width * this.gridSize, this.height * this.gridSize, 15);
        ctx.stroke();
        ctx.fill();
        ctx.restore();

        ctx.lineWidth = 2;
        const step = this.gridSize;

        const width = this.width;
        const height = this.height;
        ctx.strokeStyle = Constants.Colors.cellBoarder;
        // horizontal
        for (let i = 0; i < height - 1; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * step + step);
            ctx.lineTo(width * step, i * step + step);
            ctx.stroke();
        }
        // vertical
        for (let i = 0; i < width - 1; i++) {
            ctx.beginPath();
            ctx.moveTo(i * step + step, 0);
            ctx.lineTo(i * step + step, height * step);
            ctx.stroke();
        }

        ctx.restore();
    }
}

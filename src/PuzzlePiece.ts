import { Constants } from './Constants';
import { GRID_SIZE, HEIGHT, WIDTH } from './Game';
import { Sprite } from './Sprite';
import { Vector2 } from './types/Vector';

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomPiecePosition() {
    const width = Constants.canvas.width;
    const gridX = width * 0.5 - WIDTH * GRID_SIZE * 0.5;

    const height = Constants.canvas.height;
    const gridY = height * 0.5 - HEIGHT * GRID_SIZE * 0.5;

    let x, y;

    // no piece can be this close to the grid
    let padding = GRID_SIZE;
    do {
        x = randomNumber(padding, width - padding);
        y = randomNumber(padding, height - padding);
    } while (x + padding > gridX && x - padding < gridX + WIDTH * GRID_SIZE && y + padding > gridY && y - padding < gridY + HEIGHT * GRID_SIZE);

    return { x, y };
}

export class PuzzlePiece {
    position: Vector2;
    pieceNumber: number;
    isLockedInPlace: boolean = false;
    sprite: Sprite;
    constructor(path: string, pieceNumber: number) {
        const spritePath = `${path}/${pieceNumber}.jpg`;
        this.sprite = new Sprite(spritePath, 0.5);
        this.position = getRandomPiecePosition();
        this.pieceNumber = pieceNumber;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        if (!this.isLockedInPlace) {
            ctx.beginPath();
            ctx.roundRect(
                this.position.x - this.sprite.halfWidth,
                this.position.y - this.sprite.halfHeight,
                this.sprite.width,
                this.sprite.height,
                10
            );
            ctx.clip();
        }

        ctx.drawImage(
            this.sprite.image,
            this.position.x - this.sprite.halfWidth,
            this.position.y - this.sprite.halfHeight,
            this.sprite.width,
            this.sprite.height
        );
        ctx.restore();

        // show piece position
        // ctx.save();
        // ctx.beginPath();
        // ctx.fillStyle = 'red';
        // ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.restore();
    }
}

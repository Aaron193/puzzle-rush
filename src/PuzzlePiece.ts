import { Constants } from './Constants';
import { Sprite } from './Sprite';
import { ILevel, Vector2 } from './types/Vector';

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

export function getRandomPiecePosition({ width, height, gridSize }: ILevel) {
    const canvasWidth = Constants.canvas.width;
    const gridX = canvasWidth * 0.5 - width * gridSize * 0.5;

    const canvasHeight = Constants.canvas.height;
    const gridY = canvasHeight * 0.5 - height * gridSize * 0.5;

    let x, y;

    // no piece can be this close to the grid
    let padding = gridSize;
    do {
        x = randomNumber(padding, canvasWidth - padding);
        y = randomNumber(padding, canvasHeight - padding);
    } while (x + padding > gridX && x - padding < gridX + width * gridSize && y + padding > gridY && y - padding < gridY + height * gridSize);

    return { x, y };
}

export class PuzzlePiece {
    position: Vector2;
    pieceNumber: number;
    level: ILevel;
    isLockedInPlace: boolean = false;
    sprite: Sprite;

    constructor(path: string, level: ILevel, pieceNumber: number) {
        const spritePath = `${path}/${pieceNumber}.jpg`;
        this.sprite = new Sprite(spritePath, 0.5);
        this.level = level;
        this.position = getRandomPiecePosition(level);
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

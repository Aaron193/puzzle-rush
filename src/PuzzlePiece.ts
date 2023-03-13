// import { Sprite } from './Sprite';

import { Constants } from './Constants';
import { GRID_SIZE } from './Game';
import { Sprite } from './Sprite';
import { Vector2 } from './types/Vector';

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

export class PuzzlePiece {
    position: Vector2;
    pieceNumber: number;
    isLockedInPlace: boolean = false;
    sprite: Sprite;
    constructor(path: string, pieceNumber: number) {
        const spritePath = `${path}/${pieceNumber}.jpg`;
        this.sprite = new Sprite(spritePath, 0.5);
        this.position = {
            x: randomNumber(Constants.canvas.width / 2, Constants.canvas.width - GRID_SIZE / 2),
            y: randomNumber(0, Constants.canvas.height),
        };
        this.pieceNumber = pieceNumber;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        if (!this.isLockedInPlace) {
            ctx.beginPath();
            ctx.roundRect(this.position.x - this.sprite.halfWidth, this.position.y - this.sprite.halfHeight, this.sprite.width, this.sprite.height, 10);
            ctx.clip();
        }

        ctx.drawImage(this.sprite.image, this.position.x - this.sprite.halfWidth, this.position.y - this.sprite.halfHeight, this.sprite.width, this.sprite.height);
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

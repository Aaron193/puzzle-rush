import { Constants } from './Constants';
import { Mouse } from './Mouse';
import { PuzzleGrid } from './PuzzleGrid';
import { PuzzlePiece } from './PuzzlePiece';
import { PuzzlePieceCollection } from './PuzzlePieceCollection';
import { Vector2 } from './types/Vector';

export const WIDTH = 5;
export const HEIGHT = 5;
export const GRID_SIZE = 100;

export class Game {
    mouse: Mouse;
    puzzleGrid: PuzzleGrid;
    pieceCollection: PuzzlePieceCollection;

    holdingPiece: PuzzlePiece | null;
    holdOffset: Vector2 = { x: 0, y: 0 };

    constructor() {
        this.resize();

        this.mouse = new Mouse();
        this.puzzleGrid = new PuzzleGrid(WIDTH, HEIGHT);
        this.pieceCollection = new PuzzlePieceCollection(this, WIDTH, HEIGHT, 'images');

        window.addEventListener('resize', () => this.resize());

        this.mouse.onmousedown = () => this.mousedown();
        this.mouse.onmouseup = () => this.mouseup();
        this.mouse.onmousemove = () => this.mousemove();

        this.resize();
        this.loop();
    }

    loop() {
        const canvas = Constants.canvas;
        const ctx = Constants.ctx;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const heldPiece = this.holdingPiece;
        if (heldPiece) {
            heldPiece.position.x = this.mouse.x - heldPiece.sprite.halfWidth - this.holdOffset.x;
            heldPiece.position.y = this.mouse.y - heldPiece.sprite.halfHeight - this.holdOffset.y;
        }

        this.puzzleGrid.draw(ctx);
        this.pieceCollection.pieces.forEach(piece => piece.draw(ctx));

        requestAnimationFrame(() => this.loop());
    }

    resize() {
        const canvas = Constants.canvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    mousedown() {
        const { x, y } = this.mouse;
        const pieces = this.pieceCollection.pieces;

        for (let i = pieces.length - 1; i >= 0; i--) {
            const piece = pieces[i];

            // this piece is already placed in the correct position
            if (piece.isLockedInPlace) continue;

            const position = piece.position;
            const sprite = piece.sprite;

            if (x > position.x - sprite.halfWidth && x < position.x + sprite.halfWidth && y < position.y + sprite.halfHeight && y > position.y - sprite.halfHeight) {
                this.holdingPiece = piece;
                pieces.splice(i, 1);
                pieces.push(piece);
                this.holdOffset.x = x - (position.x + sprite.halfWidth);
                this.holdOffset.y = y - (position.y + sprite.halfHeight);
                break;
            }
        }
    }

    mouseup() {
        const holdingPiece = this.holdingPiece;
        this.holdingPiece = null;

        if (holdingPiece) {
            if (!this.pieceCollection.isInsideGrid(holdingPiece)) return;

            this.pieceCollection.checkForSolvedPiece(holdingPiece);
        }
    }

    mousemove() {}
}

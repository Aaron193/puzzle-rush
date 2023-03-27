import { Constants } from './Constants';
import { Levels, LEVEL_TYPES } from './Levels';
import { Mouse } from './Mouse';
import { PuzzleGrid } from './PuzzleGrid';
import { PuzzlePiece } from './PuzzlePiece';
import { PuzzlePieceCollection } from './PuzzlePieceCollection';
import { ILevel, Vector2 } from './types/Vector';

export class Game {
    mouse: Mouse;
    puzzleGrid: PuzzleGrid;
    pieceCollection: PuzzlePieceCollection;

    holdingPiece: PuzzlePiece | null;
    holdOffset: Vector2 = { x: 0, y: 0 };

    private gameIsActive: boolean = true;

    constructor() {
        this.resize();

        this.mouse = new Mouse();

        const level = Levels[LEVEL_TYPES.LANDSCAPE];
        this.puzzleGrid = new PuzzleGrid(level);
        this.pieceCollection = new PuzzlePieceCollection(this, level);

        window.addEventListener('resize', () => this.resize());

        this.mouse.onmousedown = () => this.mousedown();
        this.mouse.onmouseup = () => this.mouseup();
        this.mouse.onmousemove = () => this.mousemove();

        this.loop();
        // this.exitGame();
    }

    switchLevel(level: ILevel) {
        this.puzzleGrid = new PuzzleGrid(level);
        this.pieceCollection = new PuzzlePieceCollection(this, level);
    }

    exitHomepage() {
        // todo: make this constant
        const startPage = document.querySelector('.start-page') as HTMLDivElement;
        startPage.style.display = 'none';
        this.gameIsActive = true;
    }

    enterHomepage() {
        const startPage = document.querySelector('.start-page') as HTMLDivElement;
        startPage.style.display = 'flex';
        this.gameIsActive = false;
    }

    loop() {
        requestAnimationFrame(() => this.loop());

        if (!this.gameIsActive) return;

        const canvas = Constants.canvas;
        const ctx = Constants.ctx;

        ctx.fillStyle = '#0C2D48';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const heldPiece = this.holdingPiece;
        if (heldPiece) {
            heldPiece.position.x = this.mouse.x - heldPiece.sprite.halfWidth - this.holdOffset.x;
            heldPiece.position.y = this.mouse.y - heldPiece.sprite.halfHeight - this.holdOffset.y;
        }

        this.puzzleGrid.draw(ctx);
        this.pieceCollection.pieces.forEach(piece => piece.draw(ctx));
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

            if (
                x > position.x - sprite.halfWidth &&
                x < position.x + sprite.halfWidth &&
                y < position.y + sprite.halfHeight &&
                y > position.y - sprite.halfHeight
            ) {
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

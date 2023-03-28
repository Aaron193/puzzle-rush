import { Constants } from './Constants';
import { Levels, LEVEL_TYPES } from './Levels';
import { Mouse } from './Mouse';
import { PuzzleGrid } from './PuzzleGrid';
import { PuzzlePiece } from './PuzzlePiece';
import { PuzzlePieceCollection } from './PuzzlePieceCollection';
import { Sprite } from './Sprite';
import { ILevel, Vector2 } from './types/Vector';

const backgroundImage = new Sprite('images/background.png', 1);

export class Game {
    mouse: Mouse;
    puzzleGrid: PuzzleGrid;
    pieceCollection: PuzzlePieceCollection;

    holdingPiece: PuzzlePiece | null;
    holdOffset: Vector2 = { x: 0, y: 0 };
    timestamp: number = performance.now();
    timeleft: number;

    private gameIsActive: boolean = true;

    constructor() {
        this.resize();

        this.mouse = new Mouse();

        const level = Levels[LEVEL_TYPES.SWIRL];
        this.puzzleGrid = new PuzzleGrid(level);
        this.pieceCollection = new PuzzlePieceCollection(this, level);
        this.timeleft = level.time;

        window.addEventListener('resize', () => this.resize());

        this.mouse.onmousedown = () => this.mousedown();
        this.mouse.onmouseup = () => this.mouseup();
        this.mouse.onmousemove = () => this.mousemove();

        this.loop();
        this.enterHomepage();
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

    loseGame() {
        this.enterHomepage();
    }

    loop() {
        requestAnimationFrame(() => this.loop());

        if (!this.gameIsActive) return;

        const now = performance.now();
        const deltaTime = (now - this.timestamp) / 1000;
        this.timestamp = now;
        this.timeleft -= deltaTime;

        if (this.timeleft <= 0) {
            this.loseGame();
        }

        const canvas = Constants.canvas;
        const ctx = Constants.ctx;

        ctx.fillStyle = Constants.Colors.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (backgroundImage.isLoaded) {
            ctx.save();
            ctx.drawImage(backgroundImage.image, 0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 0.8;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }

        const heldPiece = this.holdingPiece;
        if (heldPiece) {
            heldPiece.position.x = this.mouse.x - heldPiece.sprite.halfWidth - this.holdOffset.x;
            heldPiece.position.y = this.mouse.y - heldPiece.sprite.halfHeight - this.holdOffset.y;
        }

        this.puzzleGrid.draw(ctx);
        this.pieceCollection.pieces.forEach(piece => piece.draw(ctx));
        this.drawTime(ctx);
    }

    drawTime(ctx: CanvasRenderingContext2D) {
        const { width } = Constants.canvas;
        const { timeleft } = this;

        ctx.fillStyle = '#fff';
        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.lineWidth = 3;
        const minutes = Math.floor(timeleft / 60);
        let seconds = Math.floor(timeleft % 60).toString();
        if (Number(seconds) < 10) {
            seconds = '0' + seconds;
        }
        ctx.fillText(`${minutes}:${seconds}`, width / 2, 50);
        ctx.strokeText(`${minutes}:${seconds}`, width / 2, 50);
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

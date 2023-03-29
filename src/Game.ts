import { Constants } from './Constants';
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

    totalTime = 0;

    levelArray: ILevel[] = [];
    level: ILevel;
    constructor() {
        this.enterHomepage();
        this.resize();

        this.mouse = new Mouse();

        window.addEventListener('resize', () => this.resize());
        document.onkeydown = e => {
            if (e.key === 'Escape') {
                this.enterHomepage();
            }
        };

        this.mouse.onmousedown = () => this.mousedown();
        this.mouse.onmouseup = () => this.mouseup();
        // this.mouse.onmousemove = () => this.mousemove();

        this.loop();
    }

    startGame() {
        this.level = this.levelArray[0];
        this.puzzleGrid = new PuzzleGrid(this.level);
        this.pieceCollection = new PuzzlePieceCollection(this, this.level);
        this.timeleft = this.level.time;
        this.gameIsActive = true;
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
        this.totalTime = 0;
        const startPage = document.querySelector('.start-page') as HTMLDivElement;
        startPage.style.display = 'flex';
        this.gameIsActive = false;
    }

    onPuzzleSolved() {
        this.levelArray.shift();
        if (this.levelArray.length > 0) {
            this.startGame();
        } else {
            const minutes = Math.floor(this.totalTime / 60);
            const seconds = Math.floor(this.totalTime % 60);
            alert(`Congratulations! You have won the game. Your time was ${minutes} minutes and ${seconds} seconds.`);
            this.enterHomepage();
        }
    }

    loseGame() {
        alert("You've ran out of time! Try again!");
        this.enterHomepage();
        this.totalTime = 0;
    }

    loop() {
        requestAnimationFrame(() => this.loop());

        if (!this.gameIsActive) return;

        const now = performance.now();
        const deltaTime = (now - this.timestamp) / 1000;
        this.timestamp = now;
        this.timeleft -= deltaTime;
        this.totalTime += deltaTime;

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

        ctx.fillStyle = '#fff';
        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.lineWidth = 3;
        const minutes = Math.floor(this.timeleft / 60);
        let seconds = Math.floor(this.timeleft % 60).toString();
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
        if (!this.gameIsActive) return;

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

    // mousemove() {}
}

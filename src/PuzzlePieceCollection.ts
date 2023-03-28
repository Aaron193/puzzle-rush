import { Game } from './Game';
import { getRandomPiecePosition, PuzzlePiece } from './PuzzlePiece';
import { ILevel } from './types/Vector';

export class PuzzlePieceCollection {
    game: Game;
    width: number;
    height: number;
    gridSize: number;
    pieces: PuzzlePiece[];

    constructor(game: Game, level: ILevel) {
        const { width, height, gridSize, path } = level;
        this.game = game;
        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
        this.pieces = new Array(width * height);

        // initilize the pieces
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i] = new PuzzlePiece(path, level, i + 1);
        }

        // const centerPiece = this.pieces[Math.ceil((this.pieces.length - 1) / 2)];
        // this.lockPiece(centerPiece, Math.ceil(width / 2), Math.ceil(height / 2));
        const firstPiece = this.pieces[0];
        this.lockPiece(firstPiece, 1, 1);
    }

    checkForSolvedPiece(piece: PuzzlePiece) {
        const { x, y } = piece.position;

        const grid = this.game.puzzleGrid;

        const target = {
            x: Math.ceil((x - grid.position.x) / this.gridSize) * this.gridSize,
            y: Math.ceil((y - grid.position.y) / this.gridSize) * this.gridSize,
        };

        const gridPiece = grid.getTile(target.x, target.y);

        // the grid slot must be an unoccupied slot
        if (gridPiece != undefined) return;

        // because we start at 1.jpg
        // const pieceNum = piece.pieceNumber - 1;
        // const p = grid.getTileAtIndex(pieceNum);
        // console.log(p);
        // const pieceX = (pieceNum % this.width) * this.gridSize;
        // const pieceY = Math.floor(pieceNum / this.width) * this.gridSize;

        // console.log(target);
        // console.log(pieceX, pieceY);

        let solvedPiece = false;

        const north = grid.getTile(target.x, target.y - this.gridSize);
        const south = grid.getTile(target.x, target.y + this.gridSize);
        const east = grid.getTile(target.x + this.gridSize, target.y);
        const west = grid.getTile(target.x - this.gridSize, target.y);

        if (north) {
            // check if the piece is the correct piece
            if (north.pieceNumber == piece.pieceNumber - this.width) {
                this.lockPiece(piece, Math.floor(target.x / this.gridSize), Math.floor(target.y / this.gridSize));
                solvedPiece = true;
            }
        } else if (south) {
            if (south.pieceNumber == piece.pieceNumber + this.width) {
                this.lockPiece(piece, Math.floor(target.x / this.gridSize), Math.floor(target.y / this.gridSize));
                solvedPiece = true;
            }
        } else if (east) {
            if (east.pieceNumber == piece.pieceNumber + 1) {
                this.lockPiece(piece, Math.floor(target.x / this.gridSize), Math.floor(target.y / this.gridSize));
                solvedPiece = true;
            }
        } else if (west) {
            if (west.pieceNumber == piece.pieceNumber - 1) {
                solvedPiece = true;
                this.lockPiece(piece, Math.floor(target.x / this.gridSize), Math.floor(target.y / this.gridSize));
            }
        }

        if (solvedPiece) {
            // we must check if the whole puzzle is solved
            const isPuzzleSolved = this.pieces.every(piece => piece.isLockedInPlace);

            if (isPuzzleSolved) {
                console.log('puzzle was solved');
            }
        } else {
            const level = piece.level;
            const { x, y } = getRandomPiecePosition(level);
            piece.position.x = x;
            piece.position.y = y;
        }
    }

    lockPiece(piece: PuzzlePiece, gridX: number, gridY: number) {
        const grid = this.game.puzzleGrid;
        grid.setTile(gridX * this.gridSize, gridY * this.gridSize, piece);

        piece.position.x = grid.position.x + gridX * this.gridSize - this.gridSize / 2;
        piece.position.y = grid.position.y + gridY * this.gridSize - this.gridSize / 2;
        piece.isLockedInPlace = true;
    }

    isInsideGrid(piece: PuzzlePiece): boolean {
        const { x, y } = piece.position;
        const grid = this.game.puzzleGrid;

        return (
            x > grid.position.x &&
            x < grid.position.x + grid.width * this.gridSize &&
            y > grid.position.y &&
            y < grid.position.y + grid.height * this.gridSize
        );
    }
}

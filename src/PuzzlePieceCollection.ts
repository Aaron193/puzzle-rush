import { Game, GRID_SIZE } from './Game';
import { PuzzlePiece } from './PuzzlePiece';

export class PuzzlePieceCollection {
    game: Game;
    width: number;
    height: number;
    pieces: PuzzlePiece[];

    constructor(game: Game, width: number, height: number, path: string) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.pieces = new Array(width * height);

        // initilize the pieces
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i] = new PuzzlePiece(path, i + 1);
        }

        const lastPiece = this.pieces[this.pieces.length - 1];
        this.lockPiece(lastPiece, width, height);
    }

    checkForSolvedPiece(piece: PuzzlePiece) {
        const position = piece.position;

        const grid = this.game.puzzleGrid;

        const target = {
            x: Math.ceil(position.x / GRID_SIZE) * GRID_SIZE,
            y: Math.ceil(position.y / GRID_SIZE) * GRID_SIZE,
        };

        const gridPiece = grid.getTile(target.x, target.y);

        // the grid slot must be an unoccupied slot
        if (gridPiece == undefined) {
            const north = grid.getTile(target.x, target.y - GRID_SIZE);
            const south = grid.getTile(target.x, target.y + GRID_SIZE);
            const east = grid.getTile(target.x + GRID_SIZE, target.y);
            const west = grid.getTile(target.x - GRID_SIZE, target.y);

            if (north) {
                // check if the piece is the correct piece
                if (north.pieceNumber == piece.pieceNumber - this.width) {
                    this.lockPiece(piece, Math.floor(target.x / GRID_SIZE), Math.floor(target.y / GRID_SIZE));
                }
            } else if (south) {
                if (south.pieceNumber == piece.pieceNumber + this.width) {
                    this.lockPiece(piece, Math.floor(target.x / GRID_SIZE), Math.floor(target.y / GRID_SIZE));
                }
            } else if (east) {
                if (east.pieceNumber == piece.pieceNumber + 1) {
                    this.lockPiece(piece, Math.floor(target.x / GRID_SIZE), Math.floor(target.y / GRID_SIZE));
                }
            } else if (west) {
                if (west.pieceNumber == piece.pieceNumber - 1) {
                    this.lockPiece(piece, Math.floor(target.x / GRID_SIZE), Math.floor(target.y / GRID_SIZE));
                }
            }
        }
    }

    lockPiece(piece: PuzzlePiece, gridX: number, gridY: number) {
        const grid = this.game.puzzleGrid;
        grid.setTile(gridX * GRID_SIZE, gridY * GRID_SIZE, piece);

        piece.position.x = gridX * GRID_SIZE - GRID_SIZE / 2;
        piece.position.y = gridY * GRID_SIZE - GRID_SIZE / 2;
        piece.isLockedInPlace = true;
    }

    isInsideGrid(piece: PuzzlePiece): boolean {
        const { x, y } = piece.position;
        const grid = this.game.puzzleGrid;

        return x > 0 && x < grid.width * GRID_SIZE && y > 0 && y < grid.height * GRID_SIZE;
    }
}

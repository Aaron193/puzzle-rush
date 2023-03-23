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

        const centerPiece = this.pieces[Math.ceil((this.pieces.length - 1) / 2)];
        this.lockPiece(centerPiece, Math.ceil(width / 2), Math.ceil(height / 2));
    }

    checkForSolvedPiece(piece: PuzzlePiece) {
        const { x, y } = piece.position;

        const grid = this.game.puzzleGrid;

        const target = {
            x: Math.ceil((x - grid.position.x) / GRID_SIZE) * GRID_SIZE,
            y: Math.ceil((y - grid.position.y) / GRID_SIZE) * GRID_SIZE,
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

        piece.position.x = grid.position.x + gridX * GRID_SIZE - GRID_SIZE / 2;
        piece.position.y = grid.position.y + gridY * GRID_SIZE - GRID_SIZE / 2;
        // piece.position.x = gridX * GRID_SIZE - GRID_SIZE / 2;
        // piece.position.y = gridY * GRID_SIZE - GRID_SIZE / 2;
        piece.isLockedInPlace = true;
    }

    isInsideGrid(piece: PuzzlePiece): boolean {
        const { x, y } = piece.position;
        const grid = this.game.puzzleGrid;

        return (
            x > grid.position.x &&
            x < grid.position.x + grid.width * GRID_SIZE &&
            y > grid.position.y &&
            y < grid.position.y + grid.height * GRID_SIZE
        );
    }
}

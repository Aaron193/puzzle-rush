export class Constants {
    static canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    static ctx = Constants.canvas.getContext('2d') as CanvasRenderingContext2D;

    static Colors = {
        background: '#0C2D48',
        gridBoarder: '#061826',
        cellBoarder: '#061826',
        gridFill: '#2E8BC0',
    };
}

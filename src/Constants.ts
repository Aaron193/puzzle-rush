export class Constants {
    static canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    static ctx = Constants.canvas.getContext('2d') as CanvasRenderingContext2D;

    static Colors = {
        background: '#141414',
        gridBoarder: 'white',
        cellBoarder: 'white',
        gridFill: 'black',
    };
}

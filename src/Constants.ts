export class Constants {
    static canvas = document.getElementById('game_canvas') as HTMLCanvasElement;
    static ctx = Constants.canvas.getContext('2d') as CanvasRenderingContext2D;
}

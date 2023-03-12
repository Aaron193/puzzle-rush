import { Vector2 } from './types/Vector';

export class Mouse {
    position: Vector2;
    private isDown: boolean;
    onmousedown = () => {};
    onmouseup = () => {};
    onmousemove = () => {};

    constructor() {
        this.position = { x: 0, y: 0 };
        this.isDown = false;
        window.addEventListener('mousemove', e => this.onMouseMove(e));
        window.addEventListener('mousedown', e => this.onMouseDown(e));
        window.addEventListener('mouseup', e => this.onMouseUp(e));
    }

    onMouseMove(e: MouseEvent) {
        this.position.x = e.clientX;
        this.position.y = e.clientY;
        this.onmousemove();
    }

    onMouseDown(e: MouseEvent) {
        this.position.x = e.clientX;
        this.position.y = e.clientY;
        this.isDown = true;
        this.onmousedown();
    }

    onMouseUp(e: MouseEvent) {
        this.position.x = e.clientX;
        this.position.y = e.clientY;
        this.isDown = false;
        this.onmouseup();
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }
    isMouseDown(): boolean {
        return this.isDown;
    }
}

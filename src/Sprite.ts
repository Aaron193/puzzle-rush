export class Sprite {
    image: HTMLImageElement;
    src: string;
    width: number;
    height: number;
    halfHeight: number;
    halfWidth: number;
    scale: number;
    isLoaded: boolean;

    constructor(src: string, scale: number) {
        this.src = src;
        this.scale = scale;
        this.isLoaded = false;

        this.image = new Image();
        this.image.src = src;
        this.image.onload = () => this.onload();
    }

    onload() {
        this.image.width *= this.scale;
        this.image.height *= this.scale;
        this.width = this.image.width;
        this.height = this.image.height;

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        this.isLoaded = true;
    }
}

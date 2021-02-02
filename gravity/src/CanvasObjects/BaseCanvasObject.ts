console.log("hi from canvas object");

interface CanvasObjectDTO {
    x: number;
    y: number;
    radius: number;
    color: string;
    c: CanvasRenderingContext2D;
}

class CanvasObject {
    x: number;
    y: number;
    radius: number;
    color: string;
    c: CanvasRenderingContext2D;

    constructor({ x, y, radius, color, c }: CanvasObjectDTO) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.c = c;
    }

    draw() {
        this.c.beginPath();
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.c.fillStyle = this.color;
        this.c.fill();
        this.c.closePath();
    }

    update() {
        this.draw();
    }
}

export default CanvasObject;

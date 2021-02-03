import { ICircle } from "../CanvasObjects/Circle";

interface canDraw {
    draw({}: any): void;
}

interface hasDrawStrategy {
    drawStrategy: canDraw;
}

class DrawFullCircle implements canDraw {
    draw({ c, x, y, radius, color }: ICircle): void {
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.fillStyle = color;
        c.fill();
        c.closePath();
    }
}

export { hasDrawStrategy, canDraw, DrawFullCircle };

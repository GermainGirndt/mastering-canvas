import { ICircle } from "../CanvasObjects/Circle";
import { c } from "../Utils/functions";

interface canDraw {
    draw({}: any): void;
}

interface hasDrawStrategy {
    drawStrategy: canDraw;
}

class DrawFullCircle implements canDraw {
    draw({ x, y, radius, color }: ICircle): void {
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.fillStyle = color;
        c.fill();
        c.closePath();
    }
}

export { hasDrawStrategy, canDraw, DrawFullCircle };

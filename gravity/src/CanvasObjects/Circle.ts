import CanvasObject from "./CanvasObject";
import { hasDrawStrategy, DrawFullCircle } from "../Strategies/DrawStrategy";
import { hasUpdateStrategy, UpdateFullCircle } from "../Strategies/UpdateStrategy";
interface ICircle {
    x: number;
    y: number;
    radius: number;
    color: string;
    c: CanvasRenderingContext2D;
}

class Circle extends CanvasObject implements hasDrawStrategy, hasUpdateStrategy {
    drawStrategy: DrawFullCircle;
    updateStrategy: UpdateFullCircle;
    radius: number;

    constructor({ x, y, color, c, radius }: ICircle) {
        super({ x, y, color, c });
        this.radius = radius;
        this.drawStrategy = new DrawFullCircle();
        this.updateStrategy = new UpdateFullCircle();
    }
}

export default Circle;

export { ICircle };

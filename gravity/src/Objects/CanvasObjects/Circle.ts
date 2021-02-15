import CanvasObject, { ICanvasObject, ICanvasObjectRequest } from "./CanvasObject";
import { hasDrawStrategy, DrawFullCircleStrategy } from "./Strategies/DrawStrategy";
import { hasUpdateStrategy, UpdateFullCircleStrategy } from "./Strategies/UpdateStrategy";
import hasObjectType from "./Interfaces/Interfaces";

interface ICircleRequest extends ICanvasObjectRequest {
    radius: number;
    color: string;
    objectType: "Circle";
}

interface ICircle extends ICircleRequest, ICanvasObject {}
export default class Circle extends CanvasObject implements hasDrawStrategy, hasUpdateStrategy, hasObjectType {
    drawStrategy: DrawFullCircleStrategy;
    updateStrategy: UpdateFullCircleStrategy;
    radius: number;

    constructor({ uuid, x, y, dX, dY, color, radius, objectType, eventEmitter }: ICircleRequest) {
        super({ uuid, x, y, dX, dY, color, objectType, eventEmitter });
        this.radius = radius;
        this.drawStrategy = new DrawFullCircleStrategy();
        this.updateStrategy = new UpdateFullCircleStrategy();
    }
}

export { ICircle, ICircleRequest };

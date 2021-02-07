import CanvasObject, { ICanvasObject, ICanvasObjectRequest } from "./CanvasObject";
import { hasDrawStrategy, DrawFullCircle } from "../Strategies/DrawStrategy";
import { hasUpdateStrategy, UpdateFullCircle } from "../Strategies/UpdateStrategy";
import hasObjectType from "./Interfaces/Interfaces";

interface ICircleRequest extends ICanvasObjectRequest {
    radius: number;
    color: string;
    objectType: "Circle";
}

interface ICircle extends ICircleRequest, ICanvasObject {}
export default class Circle extends CanvasObject implements hasDrawStrategy, hasUpdateStrategy, hasObjectType {
    drawStrategy: DrawFullCircle;
    updateStrategy: UpdateFullCircle;
    radius: number;

    constructor({ uuid, x, y, color, radius, objectType, eventEmitter }: ICircleRequest) {
        super({ uuid, x, y, color, objectType, eventEmitter });
        this.radius = radius;
        this.drawStrategy = new DrawFullCircle();
        this.updateStrategy = new UpdateFullCircle();
    }
}

export { ICircle, ICircleRequest };

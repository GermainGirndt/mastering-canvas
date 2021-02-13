import CanvasObject, { ICanvasObject, ICanvasObjectRequest } from "./CanvasObject";
import { hasDrawStrategy, DrawFullCircleStrategy } from "./Strategies/DrawStrategy";
import { hasUpdateStrategy, UpdateFullCircleStrategy } from "./Strategies/UpdateStrategy";
import hasObjectType from "./Interfaces/Interfaces";
import { hasObjectTouchStrategy, ObjectTouchReflectionStrategy } from "./Strategies/ObjectTouchStrategy";

interface ICircleRequest extends ICanvasObjectRequest {
    radius: number;
    color: string;
    objectType: "Circle";
}

interface ICircle extends ICircleRequest, ICanvasObject {}
export default class Circle
    extends CanvasObject
    implements hasDrawStrategy, hasUpdateStrategy, hasObjectType, hasObjectTouchStrategy {
    drawStrategy: DrawFullCircleStrategy;
    updateStrategy: UpdateFullCircleStrategy;
    objectTouchStrategy: ObjectTouchReflectionStrategy;
    radius: number;

    constructor({ uuid, x, y, dX, dY, color, radius, objectType, eventEmitter }: ICircleRequest) {
        super({ uuid, x, y, dX, dY, color, objectType, eventEmitter });
        this.radius = radius;
        this.drawStrategy = new DrawFullCircleStrategy();
        this.updateStrategy = new UpdateFullCircleStrategy();
        this.objectTouchStrategy = new ObjectTouchReflectionStrategy();
    }
}

export { ICircle, ICircleRequest };

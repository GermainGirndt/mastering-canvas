import CanvasObject from "./CanvasObject";
import { hasDrawStrategy, DrawFullCircle } from "../Strategies/DrawStrategy";
import { hasUpdateStrategy, UpdateFullCircle } from "../Strategies/UpdateStrategy";
import ObjectStore from "../Utils/ObjectStore";
import hasObjectType from "./Interfaces/Interfaces";
import { PossibleObjectTypes } from "../Utils/ObjectStore/Interfaces";
interface ICircle {
    x: number;
    y: number;
    radius: number;
    color: string;
}

class Circle extends CanvasObject implements hasDrawStrategy, hasUpdateStrategy, hasObjectType {
    uuid: string;
    drawStrategy: DrawFullCircle;
    updateStrategy: UpdateFullCircle;
    radius: number;
    objectType: PossibleObjectTypes = "Circle";

    constructor({ x, y, color, radius }: ICircle) {
        super({ x, y, color });
        const uuid = ObjectStore.store({
            objectType: this.objectType,
            objectProperties: { x, y, color, radius },
        });
        this.uuid = uuid;
        this.radius = radius;
        this.drawStrategy = new DrawFullCircle();
        this.updateStrategy = new UpdateFullCircle();
    }
}

export default Circle;

export { Circle, ICircle };

import CanvasObject from "./CanvasObject";
import { hasDrawStrategy, DrawFullCircle } from "../Strategies/DrawStrategy";
import { hasUpdateStrategy, UpdateFullCircle } from "../Strategies/UpdateStrategy";
import ObjectStore from "../Utils/ObjectStore";
import hasObjectType from "./Interfaces/Interfaces";
import { PossibleObjectTypes } from "../Utils/ObjectStore/Interfaces";
import { EventEmitter } from "@angular/core";
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
    eventEmitter: EventEmitter<any>;

    constructor({ x, y, color, radius }: ICircle) {
        super({ x, y, color });
        const { uuid, eventEmitter } = ObjectStore.store({
            x,
            y,
            color,
            radius,
            objectType: this.objectType,
        });
        this.uuid = uuid;
        this.radius = radius;
        this.eventEmitter = eventEmitter;
        this.drawStrategy = new DrawFullCircle();
        this.updateStrategy = new UpdateFullCircle();

        eventEmitter.subscribe(radius => {
            console.log(radius);
            this.radius = radius;
        });
    }
}

export default Circle;

export { Circle, ICircle };

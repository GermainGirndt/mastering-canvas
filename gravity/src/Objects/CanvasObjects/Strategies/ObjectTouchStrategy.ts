import { randomColor, randomIntFromRange, calcDistance } from "../../../Utils/functions";
import ObjectStore from "../../ObjectStore";
import { ICanvasObject } from "../CanvasObject";

interface canTouchObject {
    applyObjectTouchStrategy({}: any): void;
}

interface hasObjectTouchStrategy {
    objectTouchStrategy: canTouchObject;
}

interface ChangesByObjectTouch {
    x?: number;
    y?: number;
    radius?: number;
    dY?: number;
    dX?: number;
    color: string;
}

interface applyObjectTouchStrategyRequest {
    x: number;
    y: number;
    uuid: string;
    radius: number;
    dY: number;
    dX: number;
}

abstract class BaseObjectTouchStrategy {
    protected uuid: string;
    protected color: string;
    protected x: number;
    protected y: number;
    protected radius: number;
    protected dY: number;
    protected dX: number;
    protected circleTouching: ICanvasObject | null;

    public applyObjectTouchStrategy(object: applyObjectTouchStrategyRequest): ChangesByObjectTouch | undefined {
        Object.assign(this, object);
        const changesByObjectTouch = this.applyObjectTouchConcreteStrategy();

        return changesByObjectTouch;
    }

    protected abstract applyObjectTouchConcreteStrategy(): ChangesByObjectTouch | undefined;

    protected checkIfObjectsTouch(): boolean {
        const circles = ObjectStore.getAllFromType({ objectType: "Circle" });
        const circleTouching = circles.find(({ x, y, radius, uuid }) => {
            if (uuid === this.uuid) {
                return false;
            }
            const distanceBetweenCircles = calcDistance({ x1: this.x, y1: this.y, x2: x, y2: y });
            const radiusSum = this.radius + radius;

            const areObjectTouching = distanceBetweenCircles <= radiusSum;
            return areObjectTouching;
        });

        this.circleTouching = circleTouching ? circleTouching : null;

        return circleTouching ? true : false;
    }
}

class ObjectTouchReflectionStrategy extends BaseObjectTouchStrategy implements canTouchObject {
    protected applyObjectTouchConcreteStrategy(): ChangesByObjectTouch | undefined {
        if (this.checkIfObjectsTouch()) {
            return { dY: -this.dY, dX: -this.dX, color: randomColor(this.color) };
        }
        return undefined;
    }
}

export { canTouchObject, hasObjectTouchStrategy, BaseObjectTouchStrategy, ObjectTouchReflectionStrategy };

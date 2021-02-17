import animationController from "../../../Utils/animationController";
import { randomColor, randomIntFromRange, calcDistance, resolveCollision } from "../../../Utils/functions";
import ObjectStore from "../../ObjectStore";
import { IMakeableObject } from "../../ObjectStore/ObjectFactory";
import { ICanvasObject } from "../CanvasObject";
import { ICircle } from "../Circle";

interface hasObjectTouchStrategy {
    objectTouchStrategy: BaseObjectTouchStrategy;
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
    protected object: IMakeableObject;

    protected objectTouching: ICircle | null;

    public apply({ uuid, objectType }: any): void {
        this.object = ObjectStore.get({ uuid, objectType });
        this.applyObjectTouchStrategy();
    }
    protected abstract applyObjectTouchStrategy(): void;

    protected checkIfObjectsTouch(): boolean {
        const circles = ObjectStore.getAllFromType({ objectType: "Circle" });
        const objectTouching = circles.find(({ position, radius, uuid }) => {
            if (uuid === this.object.uuid) {
                return false;
            }

            const { x, y } = position;
            const distanceBetweenCircles = calcDistance({
                x1: this.object.position.x,
                y1: this.object.position.y,
                x2: x,
                y2: y,
            });
            const radiusSum = this.object.radius + radius;

            const areObjectTouching = distanceBetweenCircles < radiusSum;
            return areObjectTouching;
        });

        this.objectTouching = objectTouching ? objectTouching : null;

        return objectTouching ? true : false;
    }
}

class ObjectTouchReflectionStrategy extends BaseObjectTouchStrategy {
    protected applyObjectTouchStrategy(): void {
        if (this.checkIfObjectsTouch() && this.objectTouching) {
            resolveCollision(this.object, this.objectTouching);

            this.object.color = randomColor(this.object.color);
            this.objectTouching.color = randomColor(this.object.color);
        }
    }
}

export { BaseObjectTouchStrategy, hasObjectTouchStrategy, ObjectTouchReflectionStrategy };

import { randomColor, calcDistance, resolveCollision } from "../../../Utils/functions";
import ObjectStore from "../../ObjectStore";
import { IMakeableObject } from "../../ObjectStore/ObjectFactory";
import { ICircle } from "../Circle";

interface hasObjectTouchStrategy {
    objectTouchStrategy: BaseObjectTouchStrategy;
}
abstract class BaseObjectTouchStrategy {
    protected object: IMakeableObject;

    protected objectTouching: ICircle | null;

    public apply(object: IMakeableObject): void {
        this.object = object;
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

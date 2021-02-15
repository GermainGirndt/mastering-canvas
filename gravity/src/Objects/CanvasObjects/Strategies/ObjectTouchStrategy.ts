import animationController from "../../../Utils/animationController";
import { randomColor, randomIntFromRange, calcDistance } from "../../../Utils/functions";
import ObjectStore from "../../ObjectStore";
import { IMakeableObject } from "../../ObjectStore/ObjectFactory";
import { ICanvasObject } from "../CanvasObject";

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

    protected circleTouching: ICanvasObject | null;

    public apply({ uuid, objectType }: any): void {
        this.object = ObjectStore.get({ uuid, objectType });
        this.applyObjectTouchStrategy();
    }
    protected abstract applyObjectTouchStrategy(): void;

    protected checkIfObjectsTouch(): boolean {
        const circles = ObjectStore.getAllFromType({ objectType: "Circle" });
        const circleTouching = circles.find(({ x, y, radius, uuid }) => {
            if (uuid === this.object.uuid) {
                return false;
            }
            const distanceBetweenCircles = calcDistance({ x1: this.object.x, y1: this.object.y, x2: x, y2: y });
            const radiusSum = this.object.radius + radius;
            console.log(`Distance between circles ${distanceBetweenCircles}`);

            const areObjectTouching = distanceBetweenCircles <= radiusSum;
            return areObjectTouching;
        });

        this.circleTouching = circleTouching ? circleTouching : null;

        return circleTouching ? true : false;
    }
}

class ObjectTouchReflectionStrategy extends BaseObjectTouchStrategy {
    protected applyObjectTouchStrategy(): void {
        if (this.checkIfObjectsTouch()) {
            console.log("Objects touched!");
            animationController.debug();

            const propertiesToUpdate: any = {
                dY: -this.object.dY,
                dX: -this.object.dX,
                color: randomColor(this.object.color),
            };

            ObjectStore.update({ uuid: this.object.uuid, objectType: this.object.objectType, ...propertiesToUpdate });
        }
    }
}

export { BaseObjectTouchStrategy, hasObjectTouchStrategy, ObjectTouchReflectionStrategy };

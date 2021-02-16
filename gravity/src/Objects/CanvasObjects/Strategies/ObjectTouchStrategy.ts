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

    protected objectTouching: ICanvasObject | null;

    public apply({ uuid, objectType }: any): void {
        this.object = ObjectStore.get({ uuid, objectType });
        this.applyObjectTouchStrategy();
    }
    protected abstract applyObjectTouchStrategy(): void;

    protected checkIfObjectsTouch(): boolean {
        const circles = ObjectStore.getAllFromType({ objectType: "Circle" });
        const objectTouching = circles.find(({ x, y, radius, uuid }) => {
            if (uuid === this.object.uuid) {
                return false;
            }
            const distanceBetweenCircles = calcDistance({ x1: this.object.x, y1: this.object.y, x2: x, y2: y });
            const radiusSum = this.object.radius + radius;
            //console.log(`Distance between circles ${distanceBetweenCircles}`);

            const areObjectTouching = distanceBetweenCircles < radiusSum;
            console.log(areObjectTouching);
            return areObjectTouching;
        });

        this.objectTouching = objectTouching ? objectTouching : null;

        return objectTouching ? true : false;
    }
}

class ObjectTouchReflectionStrategy extends BaseObjectTouchStrategy {
    protected applyObjectTouchStrategy(): void {
        if (this.checkIfObjectsTouch()) {
            console.log("Objects touched!");
            console.log(this.object);
            animationController.debug();

            const angleInRad = this.calculateAngleBetweenCirclesCenter();
            const { dX, dY } = this.calculateVelocityVectors(angleInRad);

            const propertiesToUpdate: any = {
                dY: -this.object.dY,
                dX: -this.object.dX,
                color: randomColor(this.object.color),
            };

            console.log("Hypot " + Math.hypot(dY, dX));

            console.log(propertiesToUpdate);

            ObjectStore.update({ uuid: this.object.uuid, objectType: this.object.objectType, ...propertiesToUpdate });
        }
    }

    protected calculateAngleBetweenCirclesCenter(): number {
        if (!this.objectTouching) {
            throw new Error("No target object to calculate angle!");
        }
        const distanceToTargetX = this.objectTouching.x - this.object.x;
        const distanceToTargetY = this.objectTouching.y - this.object.y;

        console.log("Distance:");
        //alert(`${distanceToTargetX}, ${distanceToTargetY}`);

        const angleInRads = Math.atan2(distanceToTargetY, distanceToTargetX);

        const angleInGrads = (angleInRads * 180) / Math.PI;
        //alert(angleInGrads);

        return angleInRads;
    }

    protected calculateVelocityVectors(angleInRad: number): any {
        const dX = Math.cos(angleInRad);
        const dY = Math.sin(angleInRad);

        return { dX, dY };
    }
}

export { BaseObjectTouchStrategy, hasObjectTouchStrategy, ObjectTouchReflectionStrategy };

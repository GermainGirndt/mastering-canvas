import { randomColor, randomIntFromRange, calcDistance } from "../../../Utils/functions";
import { BaseDrawStrategy, DrawFullCircleStrategy, hasDrawStrategy } from "./DrawStrategy";
import { BaseBorderTouchStrategy, BorderTouchReflectionStrategy, hasBorderTouchStrategy } from "./BorderTouchStrategy";
import { BaseObjectTouchStrategy, hasObjectTouchStrategy, ObjectTouchReflectionStrategy } from "./ObjectTouchStrategy";
import { IMakeableObject } from "../../ObjectStore/ObjectFactory";
import { ICanvasObject } from "../CanvasObject";
import { ICircle } from "../Circle";

interface canUpdate {
    update({}: any): void;
}

interface hasUpdateStrategy {
    updateStrategy: canUpdate;
}

abstract class BaseUpdateStrategy
    implements canUpdate, hasDrawStrategy, hasBorderTouchStrategy, hasObjectTouchStrategy {
    object: IMakeableObject;
    drawStrategy: BaseDrawStrategy;
    borderTouchStrategy: BaseBorderTouchStrategy;
    objectTouchStrategy: BaseObjectTouchStrategy;

    protected abstract applyUpdateStrategy({ uuid, objectType }: any): void;

    public update(object: ICircle): void {
        this.applyUpdateStrategy(object);
    }
}

class UpdateFullCircleStrategy extends BaseUpdateStrategy {
    constructor() {
        super();
        this.drawStrategy = new DrawFullCircleStrategy();
        this.borderTouchStrategy = new BorderTouchReflectionStrategy();
        this.objectTouchStrategy = new ObjectTouchReflectionStrategy();
    }

    protected applyUpdateStrategy(object: IMakeableObject): void {
        // movement strategy
        this.drawStrategy.apply(object);
        this.borderTouchStrategy.apply(object);
        this.objectTouchStrategy.apply(object);
    }
}

export { canUpdate, BaseUpdateStrategy, UpdateFullCircleStrategy, hasUpdateStrategy };

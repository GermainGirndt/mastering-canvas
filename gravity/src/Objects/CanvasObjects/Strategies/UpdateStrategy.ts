import { randomColor, randomIntFromRange, calcDistance } from "../../../Utils/functions";
import { BaseDrawStrategy, DrawFullCircleStrategy, hasDrawStrategy } from "./DrawStrategy";
import { BaseBorderTouchStrategy, BorderTouchReflectionStrategy, hasBorderTouchStrategy } from "./BorderTouchStrategy";
import { BaseObjectTouchStrategy, hasObjectTouchStrategy, ObjectTouchReflectionStrategy } from "./ObjectTouchStrategy";
import { IMakeableObject } from "../../ObjectStore/ObjectFactory";

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

    public update({ uuid, objectType }: any): void {
        this.applyUpdateStrategy({ uuid, objectType });
    }
}

class UpdateFullCircleStrategy extends BaseUpdateStrategy {
    constructor() {
        super();
        this.drawStrategy = new DrawFullCircleStrategy();
        this.borderTouchStrategy = new BorderTouchReflectionStrategy();
        this.objectTouchStrategy = new ObjectTouchReflectionStrategy();
    }

    protected applyUpdateStrategy({ uuid, objectType }: any): void {
        // movement strategy
        this.drawStrategy.apply({ uuid, objectType });
        this.borderTouchStrategy.apply({ uuid, objectType });
        this.objectTouchStrategy.apply({ uuid, objectType });
    }
}

export { canUpdate, BaseUpdateStrategy, UpdateFullCircleStrategy, hasUpdateStrategy };

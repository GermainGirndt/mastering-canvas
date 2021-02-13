import { randomColor, randomIntFromRange, calcDistance } from "../../../Utils/functions";
import { ICircle } from "../Circle";
import { BaseDrawStrategy, DrawFullCircleStrategy } from "./DrawStrategy";
import { EventEmitter } from "@angular/core";
import { BaseBorderTouchStrategy, BorderTouchReflectionStrategy } from "./BorderTouchStrategy";
import { BaseObjectTouchStrategy } from "./ObjectTouchStrategy";

interface canUpdate {
    update({}: any): void;
}

interface hasUpdateStrategy {
    updateStrategy: canUpdate;
}

abstract class BaseUpdateStrategy implements canUpdate {
    eventEmitter: EventEmitter<any>;
    drawStrategy: BaseDrawStrategy;
    uuid: string;
    x: number;
    y: number;
    radius: number;
    dY: number;
    dX: number;
    color: string;
    borderTouchStrategy: BaseBorderTouchStrategy;
    objectTouchStrategy: BaseObjectTouchStrategy;

    public update(objectProperties: ICircle): void {
        this.updateStrategyProperties(objectProperties);
        this.drawStrategy.draw(objectProperties);

        this.applyUpdateStrategy();

        const { eventEmitter } = objectProperties;

        eventEmitter.emit({
            x: this.x + this.dX,
            y: this.y + this.dY,
            radius: this.radius,
            color: this.color,
        });
    }

    private updateStrategyProperties(objectProperties: any): void {
        Object.assign(this, objectProperties);
    }

    protected abstract applyUpdateStrategy(): void;
}

class UpdateFullCircleStrategy extends BaseUpdateStrategy {
    constructor() {
        super();
        this.borderTouchStrategy = new BorderTouchReflectionStrategy();
        this.drawStrategy = new DrawFullCircleStrategy();
        this.dY = 2;
        this.dX = 2;
        this.color = randomColor();
    }

    protected applyUpdateStrategy(): void {
        this.applyBorderChangeStrategy();
        this.applyObjectReflectStrategy();
    }

    private applyBorderChangeStrategy() {
        const changesByBorderTouch = this.borderTouchStrategy.applyBorderTouchStrategy(this);
        if (changesByBorderTouch) {
            Object.assign(this, changesByBorderTouch);
        }
    }

    private applyObjectReflectStrategy() {
        const changesByObjectTouch = this.objectTouchStrategy.applyObjectTouchStrategy(this);
        if (changesByObjectTouch) {
            Object.assign(this, changesByObjectTouch);
        }
    }
}

export { canUpdate, BaseUpdateStrategy, UpdateFullCircleStrategy, hasUpdateStrategy };

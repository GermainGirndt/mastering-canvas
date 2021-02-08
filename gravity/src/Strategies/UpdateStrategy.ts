import { randomColor, randomIntFromRange, calcDistance, colors } from "../Utils/utils";
import { ICircle } from "../CanvasObjects/Circle";
import { BaseDrawStrategy, DrawFullCircleStrategy } from "./DrawStrategy";
import { EventEmitter } from "@angular/core";
import { BaseBorderTouchStrategy, BorderTouchReflectionStrategy } from "./BorderTouchStrategy";

interface canUpdate {
    update({}: any): void;
}

interface hasUpdateStrategy {
    updateStrategy: canUpdate;
}

abstract class BaseUpdateStrategy implements canUpdate {
    eventEmitter: EventEmitter<any>;
    drawStrategy: BaseDrawStrategy;
    x: number;
    y: number;
    radius: number;
    dY: number;
    dX: number;
    color: string;
    borderTouchStrategy: BaseBorderTouchStrategy;

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
    }

    private applyBorderChangeStrategy() {
        const changesByBorderTouch = this.borderTouchStrategy.applyBorderTouchStrategy(this);
        if (changesByBorderTouch) {
            Object.assign(this, changesByBorderTouch);
        }
    }
}

export { canUpdate, BaseUpdateStrategy, UpdateFullCircleStrategy, hasUpdateStrategy };

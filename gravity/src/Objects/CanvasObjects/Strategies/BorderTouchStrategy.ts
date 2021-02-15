import { randomColor, randomIntFromRange, calcDistance } from "../../../Utils/functions";
import ObjectStore from "../../ObjectStore";
import { IMakeableObject } from "../../ObjectStore/ObjectFactory";

interface hasBorderTouchStrategy {
    borderTouchStrategy: BaseBorderTouchStrategy;
}

interface ChangesByBorderTouch {
    x?: number;
    y?: number;
    radius?: number;
    dY?: number;
    dX?: number;
    color: string;
}

interface applyBorderTouchStrategyRequest {
    x: number;
    y: number;
    radius: number;
    dY: number;
    dX: number;
    color: string;
}

abstract class BaseBorderTouchStrategy {
    protected object: IMakeableObject;

    protected isAnyBorderBeeingCrossed: boolean;
    protected isXBorderBeeingCrossed: boolean;
    protected isYBorderBeeingCrossed: boolean;
    protected isBottomBorderBeeingCrossed: boolean;
    protected isTopBorderBeeingCrossed: boolean;
    protected isLeftBorderBeeingCrossed: boolean;
    protected isRightBorderBeeingCrossed: boolean;

    public apply({ uuid, objectType }: any): void {
        this.object = ObjectStore.get({ uuid, objectType });
        this.applyConcreteStrategy();
    }

    protected abstract applyConcreteStrategy(): void;

    protected checkIfAnyBorderIsBeeingCrossedInTheNextFrame(): boolean {
        this.isAnyBorderBeeingCrossed =
            this.checkIfYBorderIsBeingCrossedInTheNextFrame() || this.checkIfXBorderIsBeeingCrossedInTheNextFrame();
        return this.isAnyBorderBeeingCrossed;
    }

    protected checkIfYBorderIsBeingCrossedInTheNextFrame(): boolean {
        this.isYBorderBeeingCrossed =
            this.checkIfBottomBorderIsBeeingCrossedInTheNextFrame() ||
            this.checkIfTopBorderIsBeeingCrossedInTheNextFrame();
        return this.isYBorderBeeingCrossed;
    }

    protected checkIfXBorderIsBeeingCrossedInTheNextFrame(): boolean {
        this.isXBorderBeeingCrossed =
            this.checkIfLeftBorderIsBeeingCrossedInTheNextFrame() ||
            this.checkIfRightBorderIsBeeingCrossedInTheNextFrame();
        return this.isXBorderBeeingCrossed;
    }

    protected checkIfBottomBorderIsBeeingCrossedInTheNextFrame(): boolean {
        this.isBottomBorderBeeingCrossed = this.object.y + this.object.dY + this.object.radius > innerHeight;
        return this.isBottomBorderBeeingCrossed;
    }

    protected checkIfTopBorderIsBeeingCrossedInTheNextFrame(): boolean {
        this.isTopBorderBeeingCrossed = this.object.y + this.object.dY - this.object.radius < 0;
        return this.isTopBorderBeeingCrossed;
    }

    protected checkIfLeftBorderIsBeeingCrossedInTheNextFrame(): boolean {
        this.isLeftBorderBeeingCrossed = this.object.x + this.object.dX - this.object.radius < 0;
        return this.isLeftBorderBeeingCrossed;
    }

    protected checkIfRightBorderIsBeeingCrossedInTheNextFrame(): boolean {
        this.isRightBorderBeeingCrossed = this.object.x + this.object.dX + this.object.radius > innerWidth;
        return this.isRightBorderBeeingCrossed;
    }
}

class BorderTouchReflectionStrategy extends BaseBorderTouchStrategy {
    protected applyConcreteStrategy(): void {
        if (this.checkIfAnyBorderIsBeeingCrossedInTheNextFrame()) {
            let propertiesToUpdate;
            if (this.isYBorderBeeingCrossed) {
                let y: number;
                if (this.isTopBorderBeeingCrossed) {
                    y = 0 + this.object.radius - this.object.dY;
                } else {
                    y = innerHeight - this.object.radius - this.object.dY;
                }
                propertiesToUpdate = { y, dY: -this.object.dY, color: randomColor(this.object.color) };
            }
            if (this.isXBorderBeeingCrossed) {
                let x: number;
                if (this.isLeftBorderBeeingCrossed) {
                    x = 0 + this.object.radius - this.object.dX;
                } else {
                    x = innerWidth - this.object.radius - this.object.dX;
                }
                propertiesToUpdate = { x, dX: -this.object.dX, color: randomColor(this.object.color) };
            }

            ObjectStore.update({ uuid: this.object.uuid, objectType: this.object.objectType, ...propertiesToUpdate });
        }
    }
}

export { BaseBorderTouchStrategy, hasBorderTouchStrategy, BorderTouchReflectionStrategy };

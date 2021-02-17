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

    protected checkIfAnyBorderIsBeeingCrossed(): boolean {
        this.isAnyBorderBeeingCrossed = this.checkIfYBorderIsBeingCrossed() || this.checkIfXBorderIsBeeingCrossed();
        return this.isAnyBorderBeeingCrossed;
    }

    protected checkIfYBorderIsBeingCrossed(): boolean {
        this.isYBorderBeeingCrossed =
            this.checkIfBottomBorderIsBeeingCrossed() || this.checkIfTopBorderIsBeeingCrossed();
        return this.isYBorderBeeingCrossed;
    }

    protected checkIfXBorderIsBeeingCrossed(): boolean {
        this.isXBorderBeeingCrossed =
            this.checkIfLeftBorderIsBeeingCrossed() || this.checkIfRightBorderIsBeeingCrossed();
        return this.isXBorderBeeingCrossed;
    }

    protected checkIfBottomBorderIsBeeingCrossed(): boolean {
        this.isBottomBorderBeeingCrossed = this.object.position.y + this.object.radius > innerHeight;
        return this.isBottomBorderBeeingCrossed;
    }

    protected checkIfTopBorderIsBeeingCrossed(): boolean {
        this.isTopBorderBeeingCrossed = this.object.position.y - this.object.radius < 0;
        return this.isTopBorderBeeingCrossed;
    }

    protected checkIfLeftBorderIsBeeingCrossed(): boolean {
        this.isLeftBorderBeeingCrossed = this.object.position.x - this.object.radius < 0;
        return this.isLeftBorderBeeingCrossed;
    }

    protected checkIfRightBorderIsBeeingCrossed(): boolean {
        this.isRightBorderBeeingCrossed = this.object.position.x + this.object.radius > innerWidth;
        return this.isRightBorderBeeingCrossed;
    }
}

class BorderTouchReflectionStrategy extends BaseBorderTouchStrategy {
    protected applyConcreteStrategy(): void {
        if (this.checkIfAnyBorderIsBeeingCrossed()) {
            let propertiesToUpdate = { position: this.object.position, velocity: this.object.velocity };

            if (this.isYBorderBeeingCrossed) {
                let y: number;
                if (this.isTopBorderBeeingCrossed) {
                    y = 0 + this.object.radius - this.object.velocity.dY;
                } else {
                    y = innerHeight - this.object.radius - this.object.velocity.dY;
                }
                Object.assign(propertiesToUpdate, {
                    position: { ...propertiesToUpdate.position, y },
                    velocity: { ...propertiesToUpdate.velocity, dY: -this.object.velocity.dY },
                });
            }

            if (this.isXBorderBeeingCrossed) {
                let x: number;
                if (this.isLeftBorderBeeingCrossed) {
                    x = 0 + this.object.radius - this.object.velocity.dX;
                } else {
                    x = innerWidth - this.object.radius - this.object.velocity.dX;
                }
                Object.assign(propertiesToUpdate, {
                    position: { ...propertiesToUpdate.position, x },
                    velocity: { ...propertiesToUpdate.velocity, dX: -this.object.velocity.dX },
                });
            }

            Object.assign(propertiesToUpdate, { color: randomColor(this.object.color) });

            ObjectStore.update({ uuid: this.object.uuid, objectType: this.object.objectType, ...propertiesToUpdate });
        }
    }
}

export { BaseBorderTouchStrategy, hasBorderTouchStrategy, BorderTouchReflectionStrategy };

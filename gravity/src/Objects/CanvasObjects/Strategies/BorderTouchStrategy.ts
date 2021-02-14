import { randomColor, randomIntFromRange, calcDistance } from "../../../Utils/functions";

interface canTouchBorder {
    applyBorderTouchStrategy({}: any): void;
}

interface hasBorderTouchStrategy {
    crossingBorderStrategy: canTouchBorder;
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
    protected x: number;
    protected y: number;
    protected radius: number;
    protected dY: number;
    protected dX: number;
    protected color: string;

    protected isAnyBorderBeeingCrossed: boolean;
    protected isXBorderBeeingCrossed: boolean;
    protected isYBorderBeeingCrossed: boolean;
    protected isBottomBorderBeeingCrossed: boolean;
    protected isTopBorderBeeingCrossed: boolean;
    protected isLeftBorderBeeingCrossed: boolean;
    protected isRightBorderBeeingCrossed: boolean;

    public applyBorderTouchStrategy(object: applyBorderTouchStrategyRequest): ChangesByBorderTouch | undefined {
        Object.assign(this, object);
        const changesByBorderTouch = this.applyBorderTouchConcreteStrategy();

        return changesByBorderTouch;
    }

    protected abstract applyBorderTouchConcreteStrategy(): ChangesByBorderTouch | undefined;

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
        this.isBottomBorderBeeingCrossed = this.y + this.dY + this.radius > innerHeight;
        return this.isBottomBorderBeeingCrossed;
    }

    protected checkIfTopBorderIsBeeingCrossedInTheNextFrame(): boolean {
        this.isTopBorderBeeingCrossed = this.y + this.dY - this.radius < 0;
        return this.isTopBorderBeeingCrossed;
    }

    protected checkIfLeftBorderIsBeeingCrossedInTheNextFrame(): boolean {
        this.isLeftBorderBeeingCrossed = this.x + this.dX - this.radius < 0;
        return this.isLeftBorderBeeingCrossed;
    }

    protected checkIfRightBorderIsBeeingCrossedInTheNextFrame(): boolean {
        this.isRightBorderBeeingCrossed = this.x + this.dX + this.radius > innerWidth;
        return this.isRightBorderBeeingCrossed;
    }
}

class BorderTouchReflectionStrategy extends BaseBorderTouchStrategy implements canTouchBorder {
    protected applyBorderTouchConcreteStrategy(): ChangesByBorderTouch | undefined {
        if (this.checkIfAnyBorderIsBeeingCrossedInTheNextFrame()) {
            console.log("border crossed");
            if (this.isYBorderBeeingCrossed) {
                let y: number;
                if (this.isTopBorderBeeingCrossed) {
                    y = 0 + this.radius - this.dY;
                } else {
                    y = innerHeight - this.radius - this.dY;
                }
                return { y, dY: -this.dY, color: randomColor(this.color) };
            }
            if (this.isXBorderBeeingCrossed) {
                let x: number;
                if (this.isLeftBorderBeeingCrossed) {
                    x = 0 + this.radius - this.dX;
                } else {
                    x = innerWidth - this.radius - this.dX;
                }
                return { x, dX: -this.dX, color: randomColor(this.color) };
            }
        }
        return undefined;
    }
}

export { canTouchBorder, hasBorderTouchStrategy, BaseBorderTouchStrategy, BorderTouchReflectionStrategy };

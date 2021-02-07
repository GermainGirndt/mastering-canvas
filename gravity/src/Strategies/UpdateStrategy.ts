import { randomColor, randomIntFromRange, calcDistance, colors } from "../Utils/utils";
import { ICircle } from "../CanvasObjects/Circle";
import { DrawFullCircle } from "./DrawStrategy";
import { EventEmitter } from "@angular/core";

interface canUpdate {
    update({}: any): void;
}

interface hasUpdateStrategy {
    updateStrategy: canUpdate;
}

class UpdateFullCircle implements canUpdate {
    eventEmitter: EventEmitter<any>;
    drawStrategy: DrawFullCircle;
    x: number = 0;
    y: number = 0;
    maxIt: number = 0;
    dY: number = 2;
    dX: number = 2;
    color: string = randomColor();

    constructor() {
        this.drawStrategy = new DrawFullCircle();
    }

    update({ uuid, x, y, radius, color, eventEmitter, ...rest }: ICircle): any {
        this.drawStrategy.draw({ uuid, x, y, radius, color, eventEmitter, ...rest });

        if (y + this.dY + radius > innerHeight || y + this.dY - radius < 0) {
            this.dY = -this.dY;
            this.color = randomColor();
        }

        if (x + this.dX + radius > innerWidth || x + this.dX - radius < 0) {
            this.dX = -this.dX;
            this.color = randomColor();
        }

        eventEmitter.emit({ x: x + this.dX, y: y + this.dY, radius, color: this.color, ...rest });
    }
}

export { canUpdate, UpdateFullCircle, hasUpdateStrategy };

import { randomColor, randomIntFromRange, calcDistance, colors } from "../Utils/utils";
import { ICircle } from "../CanvasObjects/Circle";
import { DrawFullCircle } from "./DrawStrategy";

interface canUpdate {
    update({}: any): void;
}

interface hasUpdateStrategy {
    updateStrategy: canUpdate;
}

class UpdateFullCircle implements canUpdate {
    drawStrategy: DrawFullCircle;
    x: number = 0;
    y: number = 0;
    maxIt: number = 0;

    constructor() {
        this.drawStrategy = new DrawFullCircle();
    }

    update({ c, x, y, radius, color }: ICircle): any {
        this.drawStrategy.draw({ c, x: x + this.x, y: y + this.y, radius, color });

        this.y++;
    }
}

export { canUpdate, UpdateFullCircle, hasUpdateStrategy };

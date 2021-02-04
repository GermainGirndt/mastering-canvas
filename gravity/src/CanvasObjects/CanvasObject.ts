import { canDraw } from "../Strategies/DrawStrategy";
import { canUpdate } from "../Strategies/UpdateStrategy";
import { PossibleObjectTypes } from "../Utils/ObjectStore/Interfaces";

interface ICanvasObject extends canDraw, canUpdate {
    x: number;
    y: number;
    color: string;
    draw(): void;
    update(): void;
}

export default class CanvasObject implements ICanvasObject {
    x: number;
    y: number;
    color: string;

    constructor({ x, y, color, objectType }: any) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {
        //@ts-ignore -> beeing implemented by child
        this.drawStrategy.draw(this);
    }

    update() {
        //@ts-ignore -> beeing implemented by child
        this.updateStrategy.update(this);
    }
}

export { CanvasObject, ICanvasObject };

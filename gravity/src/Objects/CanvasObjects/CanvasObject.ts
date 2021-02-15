import { EventEmitter } from "@angular/core";
import { MakeableObjectType } from "../ObjectStore/ObjectFactory";
import { canUpdate } from "./Strategies/UpdateStrategy";

interface ICanvasObject extends ICanvasObjectRequest, canUpdate {
    draw(): void;
    update(): void;
}

interface ICanvasObjectRequest {
    uuid: string;
    x: number;
    dX: number;
    y: number;
    dY: number;
    color: string;
    objectType: MakeableObjectType;
    eventEmitter: EventEmitter<any>;
}

export default abstract class CanvasObject implements ICanvasObject {
    uuid: string;
    x: number;
    dX: number;
    y: number;
    dY: number;
    color: string;
    objectType: MakeableObjectType;
    eventEmitter: EventEmitter<any>;

    constructor({ x, dX, y, dY, color, uuid, objectType, eventEmitter }: ICanvasObjectRequest) {
        this.x = x;
        this.dX = dX;
        this.y = y;
        this.dY = dY;
        this.color = color;
        this.uuid = uuid;
        this.objectType = objectType;
        this.eventEmitter = eventEmitter;

        this.eventEmitter.subscribe((props: any) => {
            this.resetObjectProperties(props);
        });
    }

    public draw() {
        //@ts-ignore -> beeing implemented by child
        this.drawStrategy.apply({ uuid: this.uuid, objectType: this.objectType });
    }

    public update() {
        //@ts-ignore -> beeing implemented by child
        this.updateStrategy.update({ uuid: this.uuid, objectType: this.objectType });
    }

    private resetObjectProperties(props: any) {
        if (props.uuid || props.eventEmitter) {
            throw new Error("Cannot reset object uuid or event Emitter " + props.uuid);
        }
        Object.assign(this, props);
    }
}

export { ICanvasObject, ICanvasObjectRequest };

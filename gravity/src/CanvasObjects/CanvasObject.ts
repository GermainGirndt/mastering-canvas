import { EventEmitter } from "@angular/core";
import { canDraw } from "../Strategies/DrawStrategy";
import { canUpdate } from "../Strategies/UpdateStrategy";
import { MakeableObjectType } from "../Utils/ObjectFactory";

interface ICanvasObject extends ICanvasObjectRequest, canDraw, canUpdate {
    draw(): void;
    update(): void;
}

interface ICanvasObjectRequest {
    uuid: string;
    x: number;
    y: number;
    color: string;
    objectType: MakeableObjectType;
    eventEmitter: EventEmitter<any>;
}

export default class CanvasObject implements ICanvasObject {
    uuid: string;
    x: number;
    y: number;
    color: string;
    objectType: MakeableObjectType;
    eventEmitter: EventEmitter<any>;

    constructor({ x, y, color, uuid, objectType, eventEmitter }: ICanvasObjectRequest) {
        this.x = x;
        this.y = y;
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
        this.drawStrategy.draw(this);
    }

    public update() {
        //@ts-ignore -> beeing implemented by child
        this.updateStrategy.update(this);
    }

    private resetObjectProperties(props: any) {
        if (props.uuid || props.eventEmitter) {
            throw new Error("Cannot reset object uuid or event Emitter " + props.uuid);
        }
        Object.assign(this, props);
    }
}

export { ICanvasObject, ICanvasObjectRequest };

import { c } from "../../../Utils/constants";
import ObjectStore from "../../ObjectStore";
import { IMakeableObject } from "../../ObjectStore/ObjectFactory";
interface hasDrawStrategy {
    drawStrategy: BaseDrawStrategy;
}

abstract class BaseDrawStrategy {
    object: IMakeableObject;

    public apply({ uuid, objectType }: any) {
        this.object = ObjectStore.get({ uuid, objectType });
        this.applyDrawStrategy();
    }

    protected abstract applyDrawStrategy(): void;
}

class DrawFullCircleStrategy extends BaseDrawStrategy {
    protected applyDrawStrategy(): void {
        const x = this.object.position.x + this.object.velocity.dX;
        const y = this.object.position.y + this.object.velocity.dY;
        c.beginPath();
        c.arc(x, y, this.object.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.object.color;
        c.fill();
        c.closePath();
        c.isPointInPath;

        ObjectStore.update({ uuid: this.object.uuid, objectType: this.object.objectType, position: { x, y } });
    }
}

export { BaseDrawStrategy, hasDrawStrategy, DrawFullCircleStrategy };

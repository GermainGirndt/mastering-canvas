import CanvasObject from "../CanvasObjects/CanvasObject";
import Circle from "../CanvasObjects/Circle";
import { colors } from "./utils";

console.log(colors);

const objects: Array<CanvasObject> = [];
function initObjects(): Array<CanvasObject> {
    for (let i = 0; i < 1; i++) {
        const object = new Circle({ x: 750, y: 60, color: "blue", radius: 15 });
        objects.push(object);
    }
    return objects;
}

export { objects, initObjects };

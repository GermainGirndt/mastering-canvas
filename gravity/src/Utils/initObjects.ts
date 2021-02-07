import ObjectFactory, { IMakeableObject } from "./ObjectFactory";
import { colors, randomColor, randomIntFromRange } from "./utils";

const objects: Array<IMakeableObject> = [];
function initObjects(): Array<IMakeableObject> {
    for (let i = 0; i < 1; i++) {
        console.log("Making object: ");
        const object = ObjectFactory.make({
            objectType: "Circle",
            x: 750,
            y: 60,
            color: randomColor(),
            radius: randomIntFromRange({ min: 15, max: 30 }),
        });
        console.log("Object made: " + object);
        objects.push(object);
    }
    return objects;
}

export { objects, initObjects };

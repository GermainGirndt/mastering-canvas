import { ICanvasObject } from "../CanvasObjects/CanvasObject";
import { ICircle } from "../CanvasObjects/Circle";
import ObjectFactory, { IMakeableObject } from "./ObjectFactory";
import ObjectStore from "./ObjectStore";
import {
    checkIfAnyAreaIsOccupiedByObject,
    checkIfObjectIsInArea,
    colors,
    Coordinates,
    getRandomCoordinates,
    Area,
    randomColor,
    randomIntFromRange,
} from "./utils";

const objects: Array<IMakeableObject> = [];

function initObjects(): Array<IMakeableObject> {
    for (let i = 0; i < 1; i++) {
        const object = ObjectFactory.make({
            objectType: "Circle",
            x: 750,
            y: 60,
            color: randomColor(),
            radius: randomIntFromRange({ min: 15, max: 30 }),
            dX: 2,
            dY: 2,
        });
        objects.push(object);
    }
    return objects;
}

function replaceObjectsOnScreen() {
    const objectStore = ObjectStore.getAll();

    for (let objectType in objectStore) {
        const objects: Array<IMakeableObject> = objectStore[objectType];

        const areasAlreadyOccupied: Array<Area> = [];

        objects.forEach(object => {
            let newCoordinates: Coordinates;
            let isOccupied = true;
            let count = 0;
            do {
                count++;
                newCoordinates = getRandomCoordinates(object.radius);
                Object.assign(object, newCoordinates);

                isOccupied = checkIfAnyAreaIsOccupiedByObject({ areas: areasAlreadyOccupied, object });

                if (count > 15000) {
                    console.log(count);
                }
            } while (isOccupied && count < 20000);

            areasAlreadyOccupied.push({ ...newCoordinates, radius: object.radius });
            console.log(areasAlreadyOccupied);
        });
    }
}

export { objects, initObjects, replaceObjectsOnScreen };

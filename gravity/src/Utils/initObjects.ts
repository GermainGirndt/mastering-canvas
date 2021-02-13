import ObjectFactory, { IMakeableObject } from "../Objects/ObjectStore/ObjectFactory";
import ObjectStore from "../Objects/ObjectStore";
import { checkIfAnyAreaIsOccupiedByObject, getRandomCoordinates, randomColor, randomIntFromRange } from "./functions";
import { Area, Coordinates } from "../Shared/Interfaces";

function initObjects(): void {
    if (ObjectStore.storageCount > 15) {
        alert("Max ball number reached!");
        return;
    }
    for (let i = 0; i < 1; i++) {
        ObjectFactory.make({
            objectType: "Circle",
            x: 750,
            y: 60,
            color: randomColor(),
            radius: randomIntFromRange({ min: 15, max: 30 }),
            dX: 2,
            dY: 2,
        });
    }
}

function replaceObjectsOnScreen(): void {
    const objects: Array<IMakeableObject> = ObjectStore.getAllAsArray();

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
        } while (isOccupied && count < 20000);

        areasAlreadyOccupied.push({ ...newCoordinates, radius: object.radius });
    });
}

function callNextFrame(
    c: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    objects: Array<IMakeableObject>,
    mouse: Coordinates
): void {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillText("CANVAS", mouse.x, mouse.y);
    objects.forEach(object => {
        object.update();
    });
}

export { initObjects, replaceObjectsOnScreen, callNextFrame };

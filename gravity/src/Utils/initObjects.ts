import ObjectFactory, { IMakeableObject } from "../Objects/ObjectStore/ObjectFactory";
import ObjectStore from "../Objects/ObjectStore";
import { checkIfAnyAreaIsOccupiedByObject, getRandomPosition, randomColor, randomIntFromRange } from "./functions";
import { Area, Position } from "../Shared/Interfaces";

function initObjects(): void {
    if (ObjectStore.storageCount >= 15) {
        return;
    }
    ObjectFactory.make({
        objectType: "Circle",
        position: { x: 600, y: 600 },
        velocity: { dX: 8, dY: 8 },
        mass: 1,
        color: randomColor(),
        radius: randomIntFromRange({ min: 30, max: 50 }),
    });

    ObjectFactory.make({
        objectType: "Circle",
        position: { x: 770, y: 700 },
        velocity: { dX: -2, dY: 2 },
        mass: 1,
        color: randomColor(),
        radius: randomIntFromRange({ min: 30, max: 50 }),
    });
}

function relocateObjectsOnScreen(): void {
    const objects: Array<IMakeableObject> = ObjectStore.getAllAsArray();

    const areasAlreadyOccupied: Array<Area> = [];
    const maxTries: number = 20000;

    objects.forEach(object => {
        let newPosition: Position;
        let isOccupied = true;
        let count = 0;
        do {
            count++;
            newPosition = getRandomPosition(object.radius);
            Object.assign(object, { position: newPosition });

            isOccupied = checkIfAnyAreaIsOccupiedByObject({ areas: areasAlreadyOccupied, object });
        } while (isOccupied && count < maxTries);

        areasAlreadyOccupied.push({ ...newPosition, radius: object.radius });
    });
}

function callNextFrame(
    c: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    objects: Array<IMakeableObject>,
    mouse: Position
): void {
    c.fillStyle = "rgba(255, 255, 255, 0.2)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillText("CANVAS", mouse.x, mouse.y);
    objects.forEach(object => {
        object.update();
    });
}

export { initObjects, relocateObjectsOnScreen, callNextFrame };

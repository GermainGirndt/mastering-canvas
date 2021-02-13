import { ICircle } from "../Objects/CanvasObjects/Circle";
import { colors } from "./constants";
import { Area, Coordinates } from "../Shared/Interfaces";

interface IRandomIntFromRange {
    min: number;
    max: number;
}
function randomIntFromRange({ min, max }: IRandomIntFromRange) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

interface IDistance {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
function calcDistance({ x1, y1, x2, y2 }: IDistance) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

interface ICheckIfObjectIsInArea {
    objectX: number;
    objectY: number;
    objectRadius: number;
    areaX: number;
    areaY: number;
    areaRadius: number;
}

function checkIfObjectIsInArea({
    objectX,
    objectY,
    objectRadius,
    areaX,
    areaY,
    areaRadius,
}: ICheckIfObjectIsInArea): boolean {
    const objectMinX = objectX - objectRadius;
    const objectMaxX = objectX + objectRadius;
    const objectMinY = objectY - objectRadius;
    const objectMaxY = objectY + objectRadius;

    const areaMinX = areaX - areaRadius;
    const areaMaxX = areaX + areaRadius;
    const areaMinY = areaY - areaRadius;
    const areaMaxY = areaY + areaRadius;

    const isNotInAreaX = areaMinX > objectMaxX || areaMaxX < objectMinX;
    const isNotInAreaY = areaMinY > objectMaxY || areaMaxY < objectMinY;

    const isNotInArea = isNotInAreaX && isNotInAreaY;

    return !isNotInArea;
}

function getRandomCoordinates(objectRadius: number = 0): Coordinates {
    const x = randomIntFromRange({ min: 0 + objectRadius, max: innerWidth - objectRadius });
    const y = randomIntFromRange({ min: 0 + objectRadius, max: innerHeight - objectRadius });
    return { y, x };
}

interface ICheckIfAnyAreaIsOccupiedByObject {
    areas: Array<Area>;
    object: ICircle;
}
function checkIfAnyAreaIsOccupiedByObject({ areas, object }: ICheckIfAnyAreaIsOccupiedByObject) {
    const isAnyAreaOccupied = areas.some(area => {
        return checkIfObjectIsInArea({
            objectX: object.x,
            objectY: object.y,
            objectRadius: object.radius,
            areaRadius: area.radius,
            areaX: area.x,
            areaY: area.y,
        });
    });

    return isAnyAreaOccupied;
}

function checkIfObjectsAreOccupingAnyArea({ areas, object }: ICheckIfAnyAreaIsOccupiedByObject) {
    const isAnyAreaOccupied = areas.some(area => {
        return checkIfObjectIsInArea({
            objectX: object.x,
            objectY: object.y,
            objectRadius: object.radius,
            areaRadius: area.radius,
            areaX: area.x,
            areaY: area.y,
        });
    });

    return isAnyAreaOccupied;
}

function randomColor(exceptionColorValue: string | null = null): any {
    const size = Object.keys(colors).length;
    const randomColorIndex = Math.floor(Math.random() * size);

    let counter = 0;
    for (let color in colors) {
        if (counter === randomColorIndex) {
            if (colors[color] !== exceptionColorValue) {
                return colors[color];
            }
            return randomColor(exceptionColorValue);
        }
        counter++;
    }
}

const debounce = (func: any, wait: any) => {
    let timeout: any;

    return function executedFunction(...args: any) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export {
    randomIntFromRange,
    randomColor,
    calcDistance,
    checkIfObjectIsInArea,
    getRandomCoordinates,
    checkIfAnyAreaIsOccupiedByObject,
    checkIfObjectsAreOccupingAnyArea,
    debounce,
};

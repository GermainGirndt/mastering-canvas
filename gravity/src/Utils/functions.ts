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

    return Math.hypot(xDist, yDist);
}

interface ICheckIfCoordinatesAreInArea {
    x: number;
    y: number;
    coordinateRadius?: number;
    areaX: number;
    areaY: number;
    areaRadius?: number;
}

function checkIfCoordinatesAreInArea({
    x,
    y,
    coordinateRadius,
    areaX,
    areaY,
    areaRadius,
}: ICheckIfCoordinatesAreInArea): boolean {
    const _coordinateRadius = coordinateRadius ? coordinateRadius : 0;
    const _areaRadius = areaRadius ? areaRadius : 0;

    const objectMinX = x - _coordinateRadius;
    const objectMaxX = x + _coordinateRadius;
    const objectMinY = y - _coordinateRadius;
    const objectMaxY = y + _coordinateRadius;

    const areaMinX = areaX - _areaRadius;
    const areaMaxX = areaX + _areaRadius;
    const areaMinY = areaY - _areaRadius;
    const areaMaxY = areaY + _areaRadius;

    const isNotInAreaX = areaMinX > objectMaxX || areaMaxX < objectMinX;
    const isNotInAreaY = areaMinY > objectMaxY || areaMaxY < objectMinY;

    const isNotInArea = isNotInAreaX || isNotInAreaY;

    return !isNotInArea;
}

function getRandomCoordinates(coordinateRadius: number = 0): Coordinates {
    const x = randomIntFromRange({ min: 0 + coordinateRadius, max: innerWidth - coordinateRadius });
    const y = randomIntFromRange({ min: 0 + coordinateRadius, max: innerHeight - coordinateRadius });
    return { y, x };
}

interface ICheckIfAnyAreaIsOccupiedByObject {
    areas: Array<Area>;
    object: ICircle;
}
function checkIfAnyAreaIsOccupiedByObject({ areas, object }: ICheckIfAnyAreaIsOccupiedByObject) {
    const isAnyAreaOccupied = areas.some(area => {
        return checkIfCoordinatesAreInArea({
            x: object.x,
            y: object.y,
            coordinateRadius: object.radius,
            areaRadius: area.radius,
            areaX: area.x,
            areaY: area.y,
        });
    });

    return isAnyAreaOccupied;
}

function checkIfObjectsAreOccupingAnyArea({ areas, object }: ICheckIfAnyAreaIsOccupiedByObject) {
    const isAnyAreaOccupied = areas.some(area => {
        return checkIfCoordinatesAreInArea({
            x: object.x,
            y: object.y,
            coordinateRadius: object.radius,
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
    checkIfCoordinatesAreInArea,
    getRandomCoordinates,
    checkIfAnyAreaIsOccupiedByObject,
    checkIfObjectsAreOccupingAnyArea,
    debounce,
};

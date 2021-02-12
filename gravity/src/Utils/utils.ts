import { ICircle } from "../CanvasObjects/Circle";

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

interface Coordinates {
    x: number;
    y: number;
}

function getRandomCoordinates(objectRadius: number = 0): Coordinates {
    const x = randomIntFromRange({ min: 0 + objectRadius, max: innerWidth - objectRadius });
    const y = randomIntFromRange({ min: 0 + objectRadius, max: innerHeight - objectRadius });
    return { y, x };
}

interface Area {
    x: number;
    y: number;
    radius: number;
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

const colors: any = {
    blue: "#2185C5",
    cianBlue: "#7ECEFD",
    yellow: "#F2E6E5",
    red: "#FF7F66",
    green: "#9AFF66",
    purple: "#CC66FF",
    poolBlue: "#45BAB9",
    brownRed: "#BA4546",
    darkPurple: "#7F45BA",
};

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

var isPaused: boolean = false;
function pause(boolean: boolean | null = null) {
    if (boolean === null) {
        isPaused = !isPaused;
        return;
    }
    isPaused = boolean;
}

export {
    randomIntFromRange,
    randomColor,
    calcDistance,
    checkIfObjectIsInArea,
    getRandomCoordinates,
    checkIfAnyAreaIsOccupiedByObject,
    checkIfObjectsAreOccupingAnyArea,
    pause,
    isPaused,
    Area,
    Coordinates,
    colors,
};

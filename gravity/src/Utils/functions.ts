import { ICircle } from "../Objects/CanvasObjects/Circle";
import { colors } from "./constants";
import { Area, Coordinates } from "../Shared/Interfaces";
import { IMakeableObject } from "../Objects/ObjectStore/ObjectFactory";

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

function rotate({ dX, dY }: any, angle: number) {
    const rotatedVelocities = {
        dX: dX * Math.cos(angle) - dY * Math.sin(angle),
        dY: dX * Math.sin(angle) + dY * Math.cos(angle),
    };

    return rotatedVelocities;
}

function resolveCollision(particle: IMakeableObject, otherParticle: IMakeableObject) {
    const xVelocityDiff = particle.dX - otherParticle.dX;
    const yVelocityDiff = particle.dY - otherParticle.dY;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate({ dX: particle.dX, dY: particle.dY }, angle);
        const u2 = rotate({ dX: otherParticle.dX, dY: otherParticle.dY }, angle);

        // Velocity after 1d collision equation
        const v1 = { dX: (u1.dX * (m1 - m2)) / (m1 + m2) + (u2.dX * 2 * m2) / (m1 + m2), dY: u1.dY };
        const v2 = { dX: (u2.dX * (m1 - m2)) / (m1 + m2) + (u1.dX * 2 * m2) / (m1 + m2), dY: u2.dY };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.dX = vFinal1.dX;
        particle.dY = vFinal1.dY;

        otherParticle.dX = vFinal2.dX;
        otherParticle.dY = vFinal2.dY;
    }
}

export {
    randomIntFromRange,
    randomColor,
    calcDistance,
    checkIfCoordinatesAreInArea,
    getRandomCoordinates,
    checkIfAnyAreaIsOccupiedByObject,
    checkIfObjectsAreOccupingAnyArea,
    debounce,
    rotate,
    resolveCollision,
};

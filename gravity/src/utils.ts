interface RandomIntFromRangeDTO {
    min: number;
    max: number;
}
function randomIntFromRange({ min, max }: RandomIntFromRangeDTO) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors: Array<String>) {
    return colors[Math.floor(Math.random() * colors.length)];
}

interface DistanceDTO {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
function distance({ x1, y1, x2, y2 }: DistanceDTO) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

export default { randomIntFromRange, randomColor, distance };

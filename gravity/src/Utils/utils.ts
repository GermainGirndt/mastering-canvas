interface IRandomIntFromRange {
    min: number;
    max: number;
}
function randomIntFromRange({ min, max }: IRandomIntFromRange) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors: Array<String>) {
    return colors[Math.floor(Math.random() * colors.length)];
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

const colors = { blue: "#2185C5", green: "#7ECEFD", yellow: "#FFF6E5", red: "#FF7F66" };

export { randomIntFromRange, randomColor, calcDistance, colors };

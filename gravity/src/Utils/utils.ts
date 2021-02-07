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

function randomColor(): any {
    const size = Object.keys(colors).length;
    const randomColorIndex = Math.floor(Math.random() * size);

    let counter = 0;
    for (let color in colors) {
        if (counter === randomColorIndex) return colors[color];
        counter++;
    }
}

export { randomIntFromRange, randomColor, calcDistance, colors };

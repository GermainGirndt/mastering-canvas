import { Coordinates } from "../Shared/Interfaces";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const c = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse: Coordinates = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};

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

export { mouse, c, canvas, colors };

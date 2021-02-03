import { initObjects } from "./initObjects";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const c = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};
addEventListener("mousemove", event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    initObjects();
});

export { mouse, c, canvas };

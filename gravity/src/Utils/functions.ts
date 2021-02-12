import { initObjects, replaceObjectsOnScreen } from "./initObjects";
import { pause } from "./utils";

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

addEventListener("contextmenu", event => {
    event.preventDefault();
    alert("success!");
});

addEventListener("dblclick", event => {
    event.preventDefault();
    pause();
});

addEventListener("click", event => {
    initObjects();
});

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

addEventListener(
    "wheel",
    debounce(() => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        replaceObjectsOnScreen();
    }, 200)
);

addEventListener(
    "resize",
    debounce(() => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        replaceObjectsOnScreen();
    }, 200)
);

export { mouse, c, canvas };

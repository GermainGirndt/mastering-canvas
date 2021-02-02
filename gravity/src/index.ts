import utils from "./utils";
import BaseCanvasObject from "./CanvasObjects/BaseCanvasObject";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const c = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

// Implementation
let objects;
function init() {
    objects = [new BaseCanvasObject({ x: 100, y: 100, color: "red", radius: 15, c })];

    for (let i = 0; i < 400; i++) {
        // objects.push()
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
    // objects.forEach(object => {
    //  object.update()
    // })
}

init();
animate();

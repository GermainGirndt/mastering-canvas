import { mouse, c, canvas } from "./Utils/functions";
import { objects, initObjects } from "./Utils/initObjects";

initObjects();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillText("CANVAS", mouse.x, mouse.y);
    objects.forEach(object => {
        object.update();
    });
}

animate();

import { mouse, c, canvas } from "./Utils/functions";
import { objects, initObjects } from "./Utils/initObjects";
import { isPaused } from "./Utils/utils";

initObjects();

function animate() {
    requestAnimationFrame(animate);
    if (!isPaused) {
        c.clearRect(0, 0, canvas.width, canvas.height);

        c.fillText("CANVAS", mouse.x, mouse.y);
        objects.forEach(object => {
            object.update();
        });
    }
}

animate();

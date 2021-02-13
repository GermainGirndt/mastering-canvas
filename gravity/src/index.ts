import { initObjects, callNextFrame } from "./Utils/initObjects";
import { c, canvas, mouse } from "./Utils/constants";
import eventListeners from "./Utils/eventListeners";
import animationController from "./Utils/animationController";
import ObjectStore from "./Objects/ObjectStore";

eventListeners();
initObjects();

function animate() {
    requestAnimationFrame(animate);

    if (!animationController.isPaused) {
        callNextFrame(c, canvas, ObjectStore.getAllAsArray(), mouse);
    }
}

animate();

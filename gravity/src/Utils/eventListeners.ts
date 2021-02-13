import { initObjects, replaceObjectsOnScreen } from "./initObjects";
import { debounce } from "./functions";
import { canvas, mouse } from "./constants";
import animationController from "./animationController";

function eventListeners() {
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
        animationController.tooglePause();
    });

    addEventListener("click", event => {
        initObjects();
    });

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
}

export default eventListeners;

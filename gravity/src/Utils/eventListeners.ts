import { initObjects, relocateObjectsOnScreen } from "./initObjects";
import { debounce } from "./functions";
import { canvas, mouse } from "./constants";
import animationController from "./animationController";
import ObjectStore from "../Objects/ObjectStore";

function eventListeners() {
    addEventListener("mousemove", event => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    addEventListener("contextmenu", event => {
        // delete
        event.preventDefault();
        const objectsClicked = ObjectStore.getAllInCoordinates({ x: event.clientX, y: event.clientY });
        ObjectStore.deleteMany(objectsClicked);
    });

    addEventListener("click", event => {
        // create
        initObjects();
    });

    addEventListener("dblclick", event => {
        // create many
        event.preventDefault();
        initObjects();
        initObjects();
        initObjects();
        initObjects();
    });

    addEventListener("keydown", event => {
        switch (event.key) {
            case " ":
                // pause
                animationController.tooglePause();
            case "i":
                // info
                const objects = ObjectStore.getAll();
                console.log(objects);
        }
    });

    addEventListener(
        "wheel",
        debounce(() => {
            // relocate
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            relocateObjectsOnScreen();
        }, 200)
    );

    addEventListener(
        "resize",
        debounce(() => {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            relocateObjectsOnScreen();
        }, 200)
    );
}

export default eventListeners;

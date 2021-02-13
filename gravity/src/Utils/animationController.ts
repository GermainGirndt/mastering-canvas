class AnimationController {
    private _isPaused: boolean = false;

    public tooglePause() {
        this._isPaused = !this._isPaused;
    }

    public get isPaused(): boolean {
        return this._isPaused;
    }

    public set isPaused(newPauseState: boolean) {
        this._isPaused = newPauseState;
    }
}

const animationController = new AnimationController();

export default animationController;

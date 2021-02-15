import ObjectStore from "../Objects/ObjectStore";

interface ICalculateTimeElapsed {
    start: Date;
    end: Date;
}
class AnimationController {
    private _isPaused: boolean = false;
    private _startTime: Date = new Date();
    private _lastResumeDate: Date = this._startTime;
    private _acumulatedAnimationTime: number = 0;

    public get isPaused(): boolean {
        return this._isPaused;
    }

    public resetAll() {
        this._isPaused = false;
        this._startTime = new Date();
        this._lastResumeDate = this._startTime;
        this._acumulatedAnimationTime = 0;
    }

    public set isPaused(newPauseState: boolean) {
        this.handleSetPauseSideEffects(newPauseState);

        this._isPaused = newPauseState;
    }

    private handleSetPauseSideEffects(newPauseState: boolean) {
        if (!newPauseState) {
            this._lastResumeDate = new Date();
        } else {
            const now = new Date();
            const partialAnimationTime = this.calculateTimeElapsed({ start: this._lastResumeDate, end: now });
            this._acumulatedAnimationTime += partialAnimationTime;
        }
    }

    public tooglePause() {
        this.isPaused = !this.isPaused;
    }

    public get startTime(): Date {
        return this._startTime;
    }

    private calculateTimeElapsed({ start, end }: ICalculateTimeElapsed): number {
        const timeElapsed = end.getTime() - start.getTime();

        const timeElapsedInSeconds = timeElapsed / 1000;

        return timeElapsedInSeconds;
    }

    public get timeElapsed(): number {
        const now = new Date();
        const timeElapsedInSeconds = this.calculateTimeElapsed({ start: this._startTime, end: now });

        return timeElapsedInSeconds;
    }

    public get animationTime(): number {
        if (!this._isPaused) {
            const now = new Date();
            const animationTimeSincePause: number = this.calculateTimeElapsed({
                start: this._lastResumeDate,
                end: now,
            });

            const animationTimeUntilNow = this._acumulatedAnimationTime + animationTimeSincePause;

            return animationTimeUntilNow;
        }
        return this._acumulatedAnimationTime;
    }

    public logStartTime(): void {
        console.log(`Canvas started at: ${this._startTime}`);
    }

    public logTimeElapsed(): void {
        console.log(`Time elapsed since start (secs): ${this.timeElapsed}`);
    }

    public logAnimationTime(): void {
        console.log(`Animation time (secs): ${this.animationTime}`);
    }

    public logInfo(): void {
        this.logStartTime();
        this.logTimeElapsed();
        this.logAnimationTime();
        const objects = ObjectStore.getAll();
        console.log("Logging objects");
        console.log(objects);
    }

    public debug(): void {
        this.tooglePause();
        this.logInfo();
    }
}

const animationController = new AnimationController();

export default animationController;

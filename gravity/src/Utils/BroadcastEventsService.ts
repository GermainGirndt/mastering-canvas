import { EventEmitter } from "@angular/core";

interface IEmitters {
    [globalEvent: string]: EventEmitter<any>;
}
type GlobalEventType = "pause";

export default class BroadcastEventsService {
    constructor() {}

    private static emitters: IEmitters = {};

    static get(globalEvent: GlobalEventType): EventEmitter<any> {
        if (!this.emitters[globalEvent]) this.emitters[globalEvent] = new EventEmitter<any>();
        return this.emitters[globalEvent];
    }

    static getAll(): IEmitters {
        return this.emitters;
    }
}

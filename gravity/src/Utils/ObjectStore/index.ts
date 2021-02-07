import { EventEmitter } from "@angular/core";
import { IMakeableObject } from "../ObjectFactory";
import { IStore, IGetRequest, ICheckIfExistsRequest, IGetAllRequest, IUpdateRequest } from "./Interfaces";

export default class ObjectStore {
    constructor() {}

    private static storage: IStore = {};

    private static register(object: IMakeableObject): void {
        const { objectType } = object;

        if (!this.storage[objectType]) this.storage[objectType] = [];
        this.storage[objectType].push(object);
    }

    public static store(object: IMakeableObject): void {
        this.register(object);
    }

    public static get({ uuid, objectType }: IGetRequest): IMakeableObject {
        let result;
        if (objectType) {
            result = this.storage[objectType].find(object => object.uuid === uuid);
        } else {
            for (const propertyType in this.storage) {
                result = this.storage[propertyType].find(object => object.uuid === uuid);
            }
        }
        if (result) return result;
        throw new Error("UUID for object doesn't exist");
    }

    private static checkIfExists({ uuid, objectType }: ICheckIfExistsRequest): boolean {
        const object = this.get({ uuid, objectType });
        if (object) return true;

        return false;
    }

    private static getEventEmitterFromObject({ uuid, objectType }: ICheckIfExistsRequest): EventEmitter<any> {
        const object = this.get({ uuid, objectType });

        const { eventEmitter } = object;
        return eventEmitter;
    }

    public static getAll({ objectType }: IGetAllRequest): IStore | Array<IMakeableObject> {
        if (objectType) return this.storage[objectType];

        return this.storage;
    }

    public static update({ uuid, objectType, ...restObjectPropertiesToUpdate }: IUpdateRequest): void {
        if (!uuid) {
            throw Error("Can not update without uuid");
        }

        const eventEmitter = this.getEventEmitterFromObject({ uuid, objectType });

        eventEmitter.emit({ objectType, ...restObjectPropertiesToUpdate });
    }
}

import { EventEmitter } from "@angular/core";
import { IMakeableObject } from "./ObjectFactory";
import { IStore, IGetRequest, ICheckIfExistsRequest, IGetAllRequest, IUpdateRequest } from "./Interfaces";

export default class ObjectStore {
    constructor() {}

    public static storageCount: number = 0;
    private static storage: IStore = {};

    private static register(object: IMakeableObject): void {
        const { objectType } = object;

        if (!this.storage[objectType]) this.storage[objectType] = { count: 0, objects: [] };
        this.storage[objectType].objects.push(object);
        this.storage[objectType].count++;
        this.storageCount++;
    }

    public static store(object: IMakeableObject): void {
        this.register(object);
    }

    public static get({ uuid, objectType }: IGetRequest): IMakeableObject {
        let result;
        if (objectType) {
            result = this.storage[objectType].objects.find(object => object.uuid === uuid);
        } else {
            for (const propertyType in this.storage) {
                result = this.storage[propertyType].objects.find(object => object.uuid === uuid);
            }
        }
        if (result) return result;
        throw new Error("UUID for object doesn't exist");
    }

    public static checkIfExists({ uuid, objectType }: ICheckIfExistsRequest): boolean {
        const object = this.get({ uuid, objectType });
        if (object) return true;

        return false;
    }

    private static getEventEmitterFromObject({ uuid, objectType }: ICheckIfExistsRequest): EventEmitter<any> {
        const object = this.get({ uuid, objectType });

        const { eventEmitter } = object;
        return eventEmitter;
    }

    public static getAll(): IStore {
        return this.storage;
    }

    public static getAllAsArray(): Array<IMakeableObject> {
        const objects: Array<IMakeableObject> = [];
        for (let objectType in this.storage) {
            const objectsOfType: Array<IMakeableObject> = this.storage[objectType].objects;
            objects.push.apply(objects, objectsOfType);
        }
        return objects;
    }

    public static getAllFromType({ objectType }: IGetAllRequest): Array<IMakeableObject> {
        if (!objectType) {
            throw new Error("objectType required!");
        }

        return this.storage[objectType].objects;
    }

    public static update({ uuid, objectType, ...restObjectPropertiesToUpdate }: IUpdateRequest): void {
        if (!uuid) {
            throw Error("Can not update without uuid");
        }

        const eventEmitter = this.getEventEmitterFromObject({ uuid, objectType });

        eventEmitter.emit({ objectType, ...restObjectPropertiesToUpdate });
    }
}

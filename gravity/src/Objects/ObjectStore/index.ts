import { EventEmitter } from "@angular/core";
import { IMakeableObject } from "./ObjectFactory";
import {
    IStore,
    IGetRequest,
    IDeleteRequest,
    ICheckIfExistsRequest,
    IGetAllRequest,
    IUpdateRequest,
} from "./Interfaces";
import { Position } from "../../Shared/Interfaces";
import { checkIfCoordinatesAreInArea } from "../../Utils/functions";
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
        if (!result) throw new Error("UUID for object doesn't exist");
        return result;
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

    public static getAllInCoordinates({ x, y }: Position): Array<IMakeableObject> {
        const objects = this.getAllAsArray();

        const allObjectsInCoordinates = objects.filter(object => {
            const isObjectInArea = checkIfCoordinatesAreInArea({
                x,
                y,
                areaX: object.position.x,
                areaY: object.position.y,
                areaRadius: object.radius,
            });
            return isObjectInArea;
        });

        return allObjectsInCoordinates;
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

    public static delete({ uuid, objectType }: IDeleteRequest): void {
        const deleteOneItem = 1;
        const noElementsFoundIndex = -1;

        if (objectType) {
            const indexToDelete = this.storage[objectType].objects.findIndex(object => object.uuid === uuid);
            this.storage[objectType].objects.splice(indexToDelete, deleteOneItem);
            this.storageCount--;
            return;
        }

        for (const propertyType in this.storage) {
            const indexToDelete = this.storage[propertyType].objects.findIndex(object => object.uuid === uuid);
            if (indexToDelete !== noElementsFoundIndex) {
                this.storage[propertyType].objects.splice(indexToDelete, deleteOneItem);
                this.storageCount--;
                return;
            }
        }
    }

    public static deleteMany(objectsToDeleteArray: Array<IDeleteRequest>): void {
        // to improve
        objectsToDeleteArray.forEach(object => {
            this.delete(object);
        });
    }

    public static removeAll(): void {
        this.storage = {};
        this.storageCount = 0;
    }
}

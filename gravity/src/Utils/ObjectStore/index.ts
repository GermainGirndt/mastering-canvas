import { EventEmitter } from "@angular/core";
import { v4 as uuidv4 } from "uuid";
import {
    IStore,
    IGetRequest,
    IGetAllRequest,
    IUpdateRequest,
    IStoredObjectsType,
    IRegisterRequest,
    IStoreRequest,
} from "./Interfaces";

interface IEmitters {
    [globalEvent: string]: EventEmitter<any>;
}
class ObjectStorage {
    constructor() {}

    private static storage: IStore = {};

    private static register({ uuid, objectType, ...objectProperties }: IRegisterRequest): void {
        console.log({ uuid, objectType, ...objectProperties });

        const objectContext = { ...objectProperties, objectType, uuid };

        if (!this.storage[objectType]) this.storage[objectType] = [];
        this.storage[objectType].push(objectContext);
    }

    public static store(objectProperties: IStoreRequest): IRegisterRequest {
        const uuid = uuidv4();
        const eventEmitter = new EventEmitter<any>();

        const storeRequest = { ...objectProperties, uuid, eventEmitter };

        var counter = 50;
        function recursiveFunction() {
            setTimeout(() => {
                if (counter < 200) {
                    eventEmitter.emit(counter);
                    counter += 0.5;
                    recursiveFunction();
                }
            }, 3);
        }
        recursiveFunction();

        this.register(storeRequest);

        return storeRequest;
    }

    public static get({ uuid, objectType }: IGetRequest): IStoredObjectsType | undefined {
        if (objectType) {
            const result = this.storage[objectType].find(object => object.uuid === uuid);
            if (result) return result;
        } else {
            for (const propertyType in this.storage) {
                console.log("called object " + propertyType);

                const result = this.storage[propertyType].find(object => object.uuid === uuid);
                if (result) return result;
            }
        }

        return undefined;
    }

    public static getAll({ objectType }: IGetAllRequest): IStore | Array<IStoredObjectsType> {
        if (objectType) return this.storage[objectType];

        return this.storage;
    }

    public static update({ uuid, objectType, objectPropertiesToUpdate }: IUpdateRequest): IStoredObjectsType {
        if ("uuid" in objectPropertiesToUpdate) {
            throw Error("Can not update uuid");
        }

        const result = this.get({ uuid, objectType });
        if (!result) throw new Error("No object found to update");

        const updatedObject = { ...result, ...objectPropertiesToUpdate };

        this.register(updatedObject);

        return updatedObject;
    }
}

export default ObjectStorage;

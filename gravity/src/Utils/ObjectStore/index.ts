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
    PossibleObjectTypes,
} from "./Interfaces";

class ObjectStorage {
    constructor() {}

    private static storage: IStore = {};

    private static register({ uuid, objectType, objectProperties }: IRegisterRequest): void {
        if (!this.storage[objectType]) throw Error("Type not supported");

        const objectContext = { ...objectProperties, objectType, uuid };

        this.storage[objectType].push(objectContext);
    }

    static store({ objectType, objectProperties }: IStoreRequest): string {
        const uuid = uuidv4();
        this.register({ uuid, objectType, objectProperties });

        return uuid;
    }

    static get({ uuid, objectType }: IGetRequest): IStoredObjectsType | undefined {
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

    static getAll({ objectType }: IGetAllRequest): IStore | Array<IStoredObjectsType> {
        if (objectType) return this.storage[objectType];

        return this.storage;
    }

    static update({ uuid, objectType, objectPropertiesToUpdate }: IUpdateRequest): IStoredObjectsType {
        if ("uuid" in objectPropertiesToUpdate) {
            throw Error("Can not update uuid");
        }

        const result = this.get({ uuid, objectType });
        if (!result) throw new Error("No object found to update");

        const objectTypeToSearch = objectType ? objectType : result.objectType;

        const updatedObject = { ...result, ...objectPropertiesToUpdate };

        this.register({ uuid, objectType: objectTypeToSearch, objectProperties: updatedObject });

        return updatedObject;
    }
}

export default ObjectStorage;

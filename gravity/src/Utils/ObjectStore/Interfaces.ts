import { EventEmitter } from "@angular/core";
import { ICircle } from "../../CanvasObjects/Circle";

interface IStore {
    [object: string]: Array<IStoredObjectsType>;
}
interface IGetRequest {
    uuid: string;
    objectType?: PossibleObjectTypes;
}

interface IGetAllRequest {
    objectType?: PossibleObjectTypes;
}

interface IUpdateRequest {
    uuid: string;
    objectType?: PossibleObjectTypes;
    objectPropertiesToUpdate: UpdatebleObjectsPropertiesType;
}
interface IRegisterRequest extends StorableObjectsType {
    uuid: string;
    objectType: PossibleObjectTypes;
    eventEmitter: EventEmitter<any>;
}

type IStoreRequest = Omit<IRegisterRequest, "uuid" | "eventEmitter">;

type StorableObjectsType = ICircle;
type PossibleObjectTypes = "Circle";

interface StoredICircle extends ICircle {
    uuid: string;
    objectType: PossibleObjectTypes;
    eventEmitter: EventEmitter<any>;
}

type IStoredObjectsType = StoredICircle;

type UpdatebleObjectsPropertiesType = Partial<Omit<IStoredObjectsType, "uuid">>;

export {
    IStore,
    IGetRequest,
    IGetAllRequest,
    IUpdateRequest,
    IRegisterRequest,
    PossibleObjectTypes,
    IStoreRequest,
    StorableObjectsType,
    IStoredObjectsType,
};

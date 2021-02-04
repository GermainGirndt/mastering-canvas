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
interface IRegisterRequest {
    uuid: string;
    objectType: PossibleObjectTypes;
    objectProperties: StorableObjectsType;
}

type IStoreRequest = Pick<IRegisterRequest, "objectType" | "objectProperties">;

type StorableObjectsType = ICircle;
type PossibleObjectTypes = "Circle";

interface StoredICircle extends ICircle {
    uuid: string;
    objectType: PossibleObjectTypes;
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

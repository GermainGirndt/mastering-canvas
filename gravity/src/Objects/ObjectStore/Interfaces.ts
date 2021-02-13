import { IMakeableObject, MakeableObjectType } from "./ObjectFactory";

interface IStore {
    [object: string]: StoredObject;
}

interface StoredObject {
    objects: Array<IMakeableObject>;
    count: number;
}

interface IGetRequest {
    uuid: string;
    objectType?: MakeableObjectType;
}
interface ICheckIfExistsRequest {
    uuid: string;
    objectType?: MakeableObjectType;
}

interface IGetAllRequest {
    objectType: MakeableObjectType;
}

interface IUpdateRequest extends UpdatebleObjectsPropertiesType {
    uuid: string;
}

type UpdatebleObjectsPropertiesType = Partial<Omit<IMakeableObject, "uuid">>;

export { IStore, IGetRequest, ICheckIfExistsRequest, IGetAllRequest, IUpdateRequest };

import { EventEmitter } from "@angular/core";
import { v4 as uuidv4 } from "uuid";
import Circle, { ICircle, ICircleRequest } from "../CanvasObjects/Circle";
import ObjectStore from "./index";

type IMakeableObjectRequest = ICircleRequest;
type MakeableObjectType = "Circle";
type IMakeableObject = ICircle;

type IMakeRequest = Omit<IMakeableObjectRequest, "uuid" | "eventEmitter">;

export default class ObjectFactory {
    public static make({ objectType, ...restProperties }: IMakeRequest): IMakeableObject {
        const uuid = uuidv4();
        const eventEmitter = new EventEmitter<any>();

        let object;
        switch (objectType) {
            case "Circle":
                object = new Circle({ ...restProperties, objectType, uuid, eventEmitter });
                break;
            default:
                throw new Error("Object Type not known");
        }

        ObjectStore.store(object);

        return object;
    }
}

export { IMakeRequest, IMakeableObjectRequest, MakeableObjectType, IMakeableObject };

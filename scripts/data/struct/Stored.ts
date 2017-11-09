import { GameStorage } from "../GameStorage";
import { Container } from "../../utils/globals/IoC";
import { Ctr } from "../../utils/struct/Ctr";

export class StoredEntity {
    id: number;
}

export function Stored(ctor: Function) {
    GameStorage.storeNames.push(ctor.constructor.name);
}
import { GameStorage } from "../GameStorage";

export class StoredEntity {
    id: number;
}

export function Stored(ctor: Function) {
    GameStorage.storeNames.push(ctor.constructor.name);
}
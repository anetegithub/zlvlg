import { } from "./IScene";

export interface ISceneManager {
    add(scene: IScene): void;
    remove(key: string): void;
    next(key: string): void;
}
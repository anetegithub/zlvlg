import { } from "./IScene";

export interface ISceneManager {
    add(scene: IScene): void;
    remove<T extends IScene>(scene: new (...args) => T): void;
    next<T extends IScene>(scene: new (...args) => T): void;
}
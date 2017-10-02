import { ISceneManager } from "../interfaces/ISceneManager";

export class MemorySceneManager implements ISceneManager {
    private scenes: IScene[];

    constructor() {
        this.scenes = [];
    }

    add(scene: IScene): void {
        this.existedScene(scene.name, false);
        this.scenes.push(scene);
    }

    remove<T extends IScene>(scene: new (...args) => T): void {
        var sceneObj = new scene();
        var findedScene = this.existedScene(sceneObj.name, true);
        this.scenes = this.scenes.splice(this.scenes.indexOf(findedScene), 1);
    }

    next<T extends IScene>(scene: new (...args) => T): void {
        var sceneObj = new scene();
        var findedScene = this.existedScene(sceneObj.name, true);
        findedScene.run();
    }

    private existedScene(key: string, exist: boolean): IScene {
        let existedScene = this.scenes.find(x => x.name == key);
        if (existedScene && !exist) {
            throw new Error(`The scene '${key}' is already exists!`);
        } else if (!existedScene && exist) {
            throw new Error(`The scene '${key}' does not exists!`);
        }

        return existedScene;
    }
}
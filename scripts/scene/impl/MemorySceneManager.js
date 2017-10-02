define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MemorySceneManager {
        constructor() {
            this.scenes = [];
        }
        add(scene) {
            this.existedScene(scene.name, false);
            this.scenes.push(scene);
        }
        remove(key) {
            var findedScene = this.existedScene(key, true);
            this.scenes = this.scenes.splice(this.scenes.indexOf(findedScene), 1);
        }
        next(key) {
            var findedScene = this.existedScene(key, true);
            findedScene.run();
        }
        existedScene(key, exist) {
            let existedScene = this.scenes.find(x => x.name == key);
            if (existedScene && !exist) {
                throw new Error(`The scene '${key}' is already exists!`);
            }
            else if (!existedScene && exist) {
                throw new Error(`The scene '${key}' does not exists!`);
            }
            return existedScene;
        }
    }
    exports.MemorySceneManager = MemorySceneManager;
});

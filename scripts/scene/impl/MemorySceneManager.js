define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var MemorySceneManager = /** @class */ (function () {
        function MemorySceneManager() {
        }
        MemorySceneManager.prototype.add = function (scene) {
            this.existedScene(scene.name, false);
            this.scenes.push(scene);
        };
        MemorySceneManager.prototype.remove = function (key) {
            var findedScene = this.existedScene(key, true);
            this.scenes = this.scenes.splice(this.scenes.indexOf(findedScene), 1);
        };
        MemorySceneManager.prototype.next = function (key) {
            var findedScene = this.existedScene(key, true);
            findedScene.run();
        };
        MemorySceneManager.prototype.existedScene = function (key, exist) {
            var existedScene = this.scenes.find(function (x) { return x.name == key; });
            if (existedScene && !exist) {
                throw new Error("The scene '" + key + "' is already exists!");
            }
            else if (!existedScene && exist) {
                throw new Error("The scene '" + key + "' does not exists!");
            }
            return existedScene;
        };
        return MemorySceneManager;
    }());
    exports.MemorySceneManager = MemorySceneManager;
});

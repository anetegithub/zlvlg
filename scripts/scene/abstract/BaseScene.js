define(["require", "exports", "../../utils/globals/IoC"], function (require, exports, IoC_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseScene {
        run() {
            this.resources.forEach(resource => resource.release(IoC_1.Container.game));
        }
    }
    exports.BaseScene = BaseScene;
});

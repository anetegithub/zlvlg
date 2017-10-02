define(["require", "exports", "../../utils/globals/IoC"], function (require, exports, IoC_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseScene {
        run() {
            if (this.clear) {
                IoC_1.Container.game.world.removeAll(true, true);
            }
            this.resources.forEach(resource => resource.release(IoC_1.Container.game));
        }
    }
    exports.BaseScene = BaseScene;
});

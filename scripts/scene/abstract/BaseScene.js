define(["require", "exports", "../../utils/globals/IoC"], function (require, exports, IoC_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseScene {
        run() {
            if (this.clear) {
                IoC_1.Container.game.world.removeAll(true, true);
            }
            if (this.loaderRes) {
                var loader = new Phaser.Loader(IoC_1.Container.game);
                this.loaderRes.forEach(res => {
                    if (res.type) {
                        loader[res.type](res.key, res.url);
                    }
                    else {
                        loader.image(res.key, res.url);
                    }
                });
                loader.onLoadComplete.addOnce(() => {
                    this.releaseManagedRes();
                }, this);
                loader.start();
            }
            else {
                this.releaseManagedRes();
            }
        }
        releaseManagedRes() {
            if (this.resources) {
                this.resources.forEach(resource => resource.release(IoC_1.Container.game));
            }
        }
    }
    exports.BaseScene = BaseScene;
});

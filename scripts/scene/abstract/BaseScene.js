define(["require", "exports", "../../utils/globals/IoC"], function (require, exports, IoC_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseScene {
        constructor() {
            document.getElementById('content').style.cursor = `url("./images/ui/cursors/cursor.png"), auto`;
        }
        run() {
            if (this.clear) {
                IoC_1.Container.game.world.removeAll(true, true);
            }
            if (this.loades) {
                var loader = new Phaser.Loader(IoC_1.Container.game);
                this.loades.forEach(res => {
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
                this.resources.forEach(this.releaseResource);
            }
        }
        releaseResource(resource) {
            resource.release(IoC_1.Container.game);
        }
        addComponents(res) {
            if (!this.resources) {
                this.resources = [];
            }
            this.resources.push(...res);
        }
        load(res) {
            if (!this.loades) {
                this.loades = [];
            }
            this.loades.push(...res);
        }
    }
    exports.BaseScene = BaseScene;
});

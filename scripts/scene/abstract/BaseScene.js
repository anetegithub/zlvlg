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
            if (this.resources) {
                var loader = new Phaser.Loader(IoC_1.Container.game);
                this.resources.forEach(res => {
                    if (res.type) {
                        loader[res.type](res.key, res.url, ...(res.args || []));
                    }
                    else {
                        loader.image(res.key, res.url);
                    }
                });
                loader.onLoadComplete.addOnce(() => {
                    this.releaseComponents();
                }, this);
                loader.start();
            }
            else {
                this.releaseComponents();
            }
        }
        releaseComponents() {
            if (this.components) {
                this.components.forEach(this.releaseComponent);
            }
        }
        releaseComponent(resource) {
            resource.release(IoC_1.Container.game);
        }
    }
    exports.BaseScene = BaseScene;
});

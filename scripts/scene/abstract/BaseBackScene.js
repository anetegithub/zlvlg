define(["require", "exports", "../../ui/impl/buttons/spritebutton/SpriteButton", "./SpriteMapScene"], function (require, exports, SpriteButton_1, SpriteMapScene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseBackScene extends SpriteMapScene_1.SpriteMapScene {
        get resources() {
            return [
                ...super.resources
            ];
        }
        get components() {
            return [
                this.backBtn
            ];
        }
        get backBtn() {
            var closure = this;
            return new SpriteButton_1.SpriteButton({
                x: 16,
                y: 16,
                text: '<',
                events: {
                    up: () => {
                        if (this.onBack) {
                            this.onBack();
                        }
                        new closure.backScene().run();
                    }
                },
                initFrame: 'buttonSquare_blue',
                pressedFrame: 'buttonSquare_blue_pressed'
            });
        }
    }
    exports.BaseBackScene = BaseBackScene;
});

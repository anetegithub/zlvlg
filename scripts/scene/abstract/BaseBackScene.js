define(["require", "exports", "../../utils/globals/Constants", "../../ui/impl/buttons/spritebutton/SpriteButton", "./SpriteMapScene"], function (require, exports, Constants_1, SpriteButton_1, SpriteMapScene_1) {
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
                x: Constants_1.Constants.gameWindowOffset.y,
                y: Constants_1.Constants.gameWindowOffset.y,
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

define(["require", "exports", "../../ui/impl/buttons/spritebutton/SpriteButton", "./SpriteMapScene"], function (require, exports, SpriteButton_1, SpriteMapScene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseBackScene extends SpriteMapScene_1.SpriteMapScene {
        get resources() {
            return [
                ...super.resources,
                { key: 'sqbtninit', url: './images/ui/sqbtn/init.png' },
                { key: 'sqbtndown', url: './images/ui/sqbtn/down.png' },
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
                x: 25,
                y: 25,
                text: '<',
                events: {
                    up: () => {
                        if (this.onBack) {
                            this.onBack();
                        }
                        new closure.backScene().run();
                    }
                },
                initSpriteKey: 'sqbtninit',
                pressSpriteKey: 'sqbtndown'
            });
        }
    }
    exports.BaseBackScene = BaseBackScene;
});

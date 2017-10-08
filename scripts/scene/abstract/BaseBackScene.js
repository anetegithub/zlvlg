define(["require", "exports", "./BaseScene", "../../ui/impl/buttons/spritebutton/SpriteButton"], function (require, exports, BaseScene_1, SpriteButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseBackScene extends BaseScene_1.BaseScene {
        constructor() {
            super();
            this.addComponents([
                this.backBtn
            ]);
            this.load([
                { key: 'sqbtninit', url: './images/ui/sqbtn/init.png' },
                { key: 'sqbtndown', url: './images/ui/sqbtn/down.png' },
            ]);
        }
        get backBtn() {
            var closure = this;
            return new SpriteButton_1.SpriteButton({
                x: 25,
                y: 25,
                text: '←',
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

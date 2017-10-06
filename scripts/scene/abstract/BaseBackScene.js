define(["require", "exports", "./BaseScene", "../../ui/impl/buttons/spritebutton/SpriteButton", "../../utils/globals/IoC"], function (require, exports, BaseScene_1, SpriteButton_1, IoC_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseBackScene extends BaseScene_1.BaseScene {
        constructor() {
            super(...arguments);
            this.virtualResources = [
                this.backBtn()
            ];
        }
        backBtn() {
            var closure = this;
            return new SpriteButton_1.SpriteButton({
                x: 25,
                y: 25,
                text: '←',
                click: () => { IoC_1.Container.sceneMgr.next(closure.backScene); },
                initSpriteKey: 'sqbtninit',
                overSpriteKey: 'sqbtnover',
                pressSpriteKey: 'sqbtndown'
            });
        }
    }
    exports.BaseBackScene = BaseBackScene;
});

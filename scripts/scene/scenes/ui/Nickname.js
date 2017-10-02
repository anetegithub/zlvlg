define(["require", "exports", "../../abstract/BaseScene", "../../../ui/impl/text/ManagedText", "../../../utils/globals/IoC"], function (require, exports, BaseScene_1, ManagedText_1, IoC_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Nickname extends BaseScene_1.BaseScene {
        constructor() {
            super(...arguments);
            this.name = 'NicknameInput';
            this.clear = true;
            this.resources = [
                this.title()
            ];
        }
        title() {
            return new ManagedText_1.ManagedText({
                text: 'Your Nickname:',
                y: 200,
                fontStyle: {
                    font: 'bold 32pt TheMinion',
                    fill: '#45ea3f',
                    align: 'center'
                }
            });
        }
    }
    exports.Nickname = Nickname;
    IoC_1.Container.sceneMgr.add(new Nickname());
});

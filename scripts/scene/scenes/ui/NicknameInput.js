define(["require", "exports", "../../abstract/BaseScene", "../../../ui/impl/text/ManagedText", "../../../utils/globals/IoC", "../../../app/core/impl/ManagedResource"], function (require, exports, BaseScene_1, ManagedText_1, IoC_1, ManagedResource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NicknameInput extends BaseScene_1.BaseScene {
        constructor() {
            super(...arguments);
            this.name = 'NicknameInput';
            this.clear = true;
            this.resources = [
                this.title(),
                this.input()
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
        input() {
            return new ManagedResource_1.ManagedResource(game => {
                var input = new PhaserInput.InputField(game, game.world.centerX, game.world.centerY, {
                    font: '18pt TheMinion',
                    fill: '#45ea3f',
                    width: 200,
                    max: "20",
                    type: PhaserInput.InputType.text
                });
            });
        }
    }
    exports.NicknameInput = NicknameInput;
    IoC_1.Container.onInited(() => {
        IoC_1.Container.sceneMgr.add(new NicknameInput());
    });
});

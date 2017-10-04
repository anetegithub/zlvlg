define(["require", "exports", "../../abstract/BaseScene", "../../../ui/impl/text/ManagedText", "../../../utils/globals/IoC", "../../../app/core/impl/ManagedResource", "../../../utils/globals/Constants", "../../../ui/impl/buttons/spritebutton/SpriteButton"], function (require, exports, BaseScene_1, ManagedText_1, IoC_1, ManagedResource_1, Constants_1, SpriteButton_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NicknameInput extends BaseScene_1.BaseScene {
        constructor() {
            super(...arguments);
            this.loaderRes = [
                { key: 'sqbtninit', url: './images/ui/sqbtn/init.png' },
                { key: 'sqbtnover', url: './images/ui/sqbtn/over.png' },
                { key: 'sqbtndown', url: './images/ui/sqbtn/down.png' },
            ];
            this.name = 'NicknameInput';
            this.clear = true;
            this.resources = [
                this.title(),
                this.input(),
                this.okButton()
            ];
        }
        title() {
            return new ManagedText_1.ManagedText({
                text: 'Your Nickname:',
                y: 200,
                fontStyle: {
                    font: 'bold 32pt TheMinion',
                    fill: Constants_1.Constants.color,
                    align: 'center'
                }
            });
        }
        input() {
            return new ManagedResource_1.ManagedResource(game => {
                this.inputElement = new PhaserInput.InputField(game, (game.world.centerX / 2) + 15, game.world.centerY, {
                    font: '28px TheMinion',
                    fill: '#ffffff',
                    fontWeight: 'bold',
                    backgroundColor: '#000000',
                    width: game.world.centerX - 145,
                    padding: 8,
                    borderWidth: 2,
                    borderColor: Constants_1.Constants.color,
                    borderRadius: 10,
                    type: PhaserInput.InputType.text,
                    textAlign: 'center',
                    align: 'center',
                    max: '20'
                });
                game.add.existing(this.inputElement);
            });
        }
        okButton() {
            return new SpriteButton_1.SpriteButton({
                x: (IoC_1.Container.game.world.centerX / 2) + 300,
                y: IoC_1.Container.game.world.centerY,
                text: 'Ok',
                click: () => { console.log(this.inputElement.value); },
                initSpriteKey: 'sqbtninit',
                overSpriteKey: 'sqbtnover',
                pressSpriteKey: 'sqbtndown'
            });
        }
    }
    exports.NicknameInput = NicknameInput;
    IoC_1.Container.onInited(() => {
        IoC_1.Container.sceneMgr.add(new NicknameInput());
    });
});

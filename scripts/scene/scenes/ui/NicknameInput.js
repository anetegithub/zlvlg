define(["require", "exports", "../../../ui/impl/text/ManagedText", "../../../utils/globals/IoC", "../../../app/core/impl/ManagedResource", "../../../utils/globals/Constants", "../../../ui/impl/buttons/spritebutton/SpriteButton", "../../abstract/BaseBackScene", "../MainMenuScene"], function (require, exports, ManagedText_1, IoC_1, ManagedResource_1, Constants_1, SpriteButton_1, BaseBackScene_1, MainMenuScene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NicknameInput extends BaseBackScene_1.BaseBackScene {
        constructor() {
            super(...arguments);
            this.backScene = MainMenuScene_1.MainMenuScene;
            this.loaderRes = [
                { key: 'sqbtninit', url: './images/ui/sqbtn/init.png' },
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
                    font: 'bold 32pt ' + Constants_1.Constants.fontFamily,
                    fill: Constants_1.Constants.color,
                    align: 'center'
                }
            });
        }
        input() {
            return new ManagedResource_1.ManagedResource(game => {
                this.inputElement = new PhaserInput.InputField(game, (game.world.centerX / 2) + 15, game.world.centerY, {
                    font: '28px ' + Constants_1.Constants.fontFamily,
                    fill: '#ffffff',
                    fontWeight: 'bold',
                    backgroundColor: '#000000',
                    width: game.world.centerX - 120,
                    padding: 8,
                    borderWidth: 2,
                    borderColor: Constants_1.Constants.color,
                    borderRadius: 10,
                    type: PhaserInput.InputType.text,
                    textAlign: 'center',
                    align: 'center',
                    max: '17'
                });
                this.inputElement.input.useHandCursor = false;
                this.inputElement.events.onInputOver.add(() => this.setPointer('hand'));
                this.inputElement.events.onInputOut.add(() => this.setPointer('cursor'));
                this.inputElement.events.onInputUp.add(() => this.setPointer('cursor'));
                this.inputElement.events.onInputDown.add(() => this.setPointer('cursor'));
                game.add.existing(this.inputElement);
            });
        }
        setPointer(name) {
            document.getElementById('content').style.cursor = `url("./images/ui/cursors/${name}.png"), auto`;
        }
        okButton() {
            return new SpriteButton_1.SpriteButton({
                x: (IoC_1.Container.game.world.centerX / 2) + 335,
                y: IoC_1.Container.game.world.centerY,
                text: 'Ok',
                events: {
                    up: () => { console.log(this.inputElement.value); }
                },
                initSpriteKey: 'sqbtninit',
                pressSpriteKey: 'sqbtndown'
            });
        }
    }
    exports.NicknameInput = NicknameInput;
    IoC_1.Container.onInited(() => {
        IoC_1.Container.sceneMgr.add(new NicknameInput());
    });
});

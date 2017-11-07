define(["require", "exports", "../../../ui/impl/text/ManagedText", "../../../utils/globals/IoC", "../../../app/core/impl/ManagedComponent", "../../../utils/globals/Constants", "../../../ui/impl/buttons/spritebutton/SpriteButton", "../../abstract/BaseBackScene", "../MainMenuScene", "./SexSelect"], function (require, exports, ManagedText_1, IoC_1, ManagedComponent_1, Constants_1, SpriteButton_1, BaseBackScene_1, MainMenuScene_1, SexSelect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NicknameInput extends BaseBackScene_1.BaseBackScene {
        constructor() {
            super(...arguments);
            this.backScene = MainMenuScene_1.MainMenuScene;
            this.name = 'NicknameInput';
            this.clear = true;
        }
        async components() {
            return [
                ...(await super.components()),
                this.title,
                this.input,
                this.okButton
            ];
        }
        get title() {
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
        get input() {
            return new ManagedComponent_1.ManagedComponent(game => {
                this.inputElement = new PhaserInput.InputField(game, (game.world.centerX / 2) + 15, Constants_1.Constants.centerY, {
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
                game.add.existing(this.inputElement);
            });
        }
        setPointer(name) {
            document.getElementById('content').style.cursor = `url("./images/ui/cursors/${name}.png"), auto`;
        }
        get okButton() {
            return new SpriteButton_1.SpriteButton({
                x: (IoC_1.Container.game.world.centerX / 2) + 335,
                y: Constants_1.Constants.centerY,
                text: 'Ok',
                events: {
                    down: () => {
                        if (this.inputElement.value) {
                            new SexSelect_1.SexSelect().run();
                        }
                    }
                },
                initFrame: 'buttonSquare_blue',
                pressedFrame: 'buttonSquare_blue_pressed'
            });
        }
    }
    exports.NicknameInput = NicknameInput;
});

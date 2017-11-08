define(["require", "exports", "../../MainMenuScene", "../../../../utils/globals/Constants", "../../../../app/core/impl/ManagedComponent", "../../../../ui/impl/buttons/spritebutton/SpriteButton", "../../../../utils/globals/IoC", "../../../../data/struct/CreateCharacterState", "./SexSelect", "./CreateSceneStage"], function (require, exports, MainMenuScene_1, Constants_1, ManagedComponent_1, SpriteButton_1, IoC_1, CreateCharacterState_1, SexSelect_1, CreateSceneStage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class NicknameInput extends CreateSceneStage_1.CreateSceneStage {
        constructor() {
            super('Your Nickname:');
            this.backScene = MainMenuScene_1.MainMenuScene;
            this.name = 'NicknameInput';
            this.clear = true;
        }
        async components() {
            return [
                ...(await super.components()),
                this.input,
                this.okButton
            ];
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
                    down: () => { this.ok(); }
                },
                initFrame: 'buttonSquare_blue',
                pressedFrame: 'buttonSquare_blue_pressed'
            });
        }
        ok() {
            const value = this.inputElement.value;
            if (value) {
                let charState = new CreateCharacterState_1.CreateCharacterState();
                charState.name = value;
                IoC_1.Container.register(CreateCharacterState_1.CreateCharacterState, charState);
                new SexSelect_1.SexSelect().run();
            }
        }
    }
    exports.NicknameInput = NicknameInput;
});

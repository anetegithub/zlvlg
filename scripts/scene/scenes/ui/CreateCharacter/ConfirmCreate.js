define(["require", "exports", "./CreateSceneStage", "./ProfessionSelect", "../../../../utils/globals/IoC", "../../../../data/struct/CreateCharacterState", "../../../../ui/impl/text/ManagedText", "../../../../utils/globals/Constants", "../../../../ui/impl/buttons/spritebutton/SpriteButton", "../../../../game/enums/Class", "../../../../game/enums/Profession"], function (require, exports, CreateSceneStage_1, ProfessionSelect_1, IoC_1, CreateCharacterState_1, ManagedText_1, Constants_1, SpriteButton_1, Class_1, Profession_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ConfirmCreate extends CreateSceneStage_1.CreateSceneStage {
        constructor() {
            super('Confirm:');
            this.backScene = ProfessionSelect_1.ProfessionSelect;
            this.clear = true;
        }
        async components() {
            return [
                ...(await super.components()),
                ...this.info
            ];
        }
        get info() {
            const info = IoC_1.Container.resolve(CreateCharacterState_1.CreateCharacterState);
            return [
                this.text(info.name, 250),
                this.text(Class_1.Class[info.class], 270),
                this.text(Profession_1.Profession[info.proffesion], 290)
            ];
        }
        get ok() {
            return new SpriteButton_1.SpriteButton({
                text: 'ok',
                initFrame: 'buttonSquare_blue',
                pressedFrame: 'buttonSquare_blue_pressed',
                x: Constants_1.Constants.centerX - 22.5,
                y: 310,
                events: {
                    down: () => { this.okAction(); }
                }
            });
        }
        okAction() {
            console.log('created');
        }
        text(val, y) {
            return new ManagedText_1.ManagedText({
                text: val,
                y: y,
                fontStyle: {
                    font: 'bold 32pt ' + Constants_1.Constants.fontFamily,
                    fill: Constants_1.Constants.color,
                    align: 'center'
                }
            });
        }
    }
    exports.ConfirmCreate = ConfirmCreate;
});

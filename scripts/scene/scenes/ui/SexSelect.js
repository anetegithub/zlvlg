define(["require", "exports", "../../abstract/BaseBackScene", "./NicknameInput", "../../../ui/impl/buttons/spritebutton/SpriteButton", "../../../game/enums/Sex", "./ClassSelect", "../../../ui/impl/text/ManagedText", "../../../utils/globals/Constants"], function (require, exports, BaseBackScene_1, NicknameInput_1, SpriteButton_1, Sex_1, ClassSelect_1, ManagedText_1, Constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SexSelect extends BaseBackScene_1.BaseBackScene {
        constructor() {
            super(...arguments);
            this.backScene = NicknameInput_1.NicknameInput;
            this.clear = true;
        }
        async components() {
            return [
                ...(await super.components()),
                this.title,
                this.sexButton(Sex_1.Sex.Male),
                this.sexButton(Sex_1.Sex.Female)
            ];
        }
        get title() {
            return new ManagedText_1.ManagedText({
                text: 'Your sex:',
                y: 200,
                fontStyle: {
                    font: 'bold 32pt ' + Constants_1.Constants.fontFamily,
                    fill: Constants_1.Constants.color,
                    align: 'center'
                }
            });
        }
        sexButton(sex) {
            return new SpriteButton_1.SpriteButton({
                text: sex == Sex_1.Sex.Male ? '♂' : '♀',
                initFrame: 'buttonSquare_blue',
                pressedFrame: 'buttonSquare_blue_pressed',
                x: Constants_1.Constants.centerX - 60 + (sex * 60),
                y: Constants_1.Constants.centerY - 20,
                events: {
                    down: () => {
                        new ClassSelect_1.ClassSelect(sex).run();
                    }
                }
            });
        }
    }
    exports.SexSelect = SexSelect;
});

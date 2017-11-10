define(["require", "exports", "./NicknameInput", "../../../../game/enums/Sex", "../../../../utils/globals/Constants", "../../../../ui/impl/buttons/spritebutton/SpriteButton", "../../../../data/struct/Character", "../../../../utils/globals/IoC", "./ClassSelect", "./CreateSceneStage"], function (require, exports, NicknameInput_1, Sex_1, Constants_1, SpriteButton_1, Character_1, IoC_1, ClassSelect_1, CreateSceneStage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SexSelect extends CreateSceneStage_1.CreateSceneStage {
        constructor() {
            super('Your sex:');
            this.backScene = NicknameInput_1.NicknameInput;
            this.clear = true;
        }
        async components() {
            return [
                ...(await super.components()),
                this.sexButton(Sex_1.Sex.Male),
                this.sexButton(Sex_1.Sex.Female)
            ];
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
                        this.chooseSex(sex);
                    }
                }
            });
        }
        chooseSex(sex) {
            IoC_1.Container.resolve(Character_1.Character).sex = sex;
            new ClassSelect_1.ClassSelect().run();
        }
    }
    exports.SexSelect = SexSelect;
});

define(["require", "exports", "../../abstract/BaseBackScene", "./ClassSelect", "../../../ui/impl/text/ManagedText", "../../../utils/globals/Constants", "../../../game/enums/Profession", "../../../utils/globals/IoC", "../../../components/ui/Panel"], function (require, exports, BaseBackScene_1, ClassSelect_1, ManagedText_1, Constants_1, Profession_1, IoC_1, Panel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ProfessionSelect extends BaseBackScene_1.BaseBackScene {
        constructor() {
            super(...arguments);
            this.backScene = ClassSelect_1.ClassSelect;
            this.clear = true;
        }
        async components() {
            return [
                ...(await super.components()),
                this.title,
                ...this.profTabs
            ];
        }
        get title() {
            return new ManagedText_1.ManagedText({
                text: 'Select your profession:',
                y: 185,
                fontStyle: {
                    font: 'bold 32pt ' + Constants_1.Constants.fontFamily,
                    fill: Constants_1.Constants.color,
                    align: 'center'
                }
            });
        }
        get profTabs() {
            let x = Constants_1.Constants.mapOffset.x + 115;
            let y = 264;
            return Object.keys(Profession_1.Profession).map(enumKey => {
                console.log(enumKey);
                let prof = new Phaser.Sprite(IoC_1.Container.game, 0, 0, Constants_1.Constants.spriteAssert, Profession_1.Profession[enumKey]);
                prof.scale.x = 2;
                prof.scale.y = 2;
                let panel = new Panel_1.Panel({ w: x, h: y }, "buttonSquare_blue", prof, enumKey);
                x += panel.width + 78;
                return panel;
            });
        }
    }
    exports.ProfessionSelect = ProfessionSelect;
});

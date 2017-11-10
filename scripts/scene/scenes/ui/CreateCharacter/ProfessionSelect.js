define(["require", "exports", "./ClassSelect", "../../../../utils/globals/Constants", "../../../../game/enums/Profession", "../../../../utils/globals/IoC", "../../../../components/ui/Panel", "../../../../data/struct/Character", "./CreateSceneStage", "./ConfirmCreate"], function (require, exports, ClassSelect_1, Constants_1, Profession_1, IoC_1, Panel_1, Character_1, CreateSceneStage_1, ConfirmCreate_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ProfessionSelect extends CreateSceneStage_1.CreateSceneStage {
        constructor() {
            super("Select your profession:");
            this.backScene = ClassSelect_1.ClassSelect;
            this.clear = true;
        }
        async components() {
            return [
                ...(await super.components()),
                ...this.profTabs
            ];
        }
        get profTabs() {
            let x = Constants_1.Constants.mapOffset.x + 115;
            let y = 264;
            return Object.keys(Profession_1.Profession).map(enumKey => {
                let prof = new Phaser.Sprite(IoC_1.Container.game, 0, 0, Constants_1.Constants.spriteAssert, Profession_1.Profession[enumKey]);
                prof.scale.x = 2;
                prof.scale.y = 2;
                let panel = new Panel_1.Panel({ w: x, h: y }, "buttonSquare_blue", prof, enumKey);
                panel.click = () => { this.setProf(enumKey); };
                x += panel.width + 78;
                return panel;
            });
        }
        setProf(prof) {
            IoC_1.Container.resolve(Character_1.Character).proffesion = prof;
            new ConfirmCreate_1.ConfirmCreate().run();
        }
    }
    exports.ProfessionSelect = ProfessionSelect;
});

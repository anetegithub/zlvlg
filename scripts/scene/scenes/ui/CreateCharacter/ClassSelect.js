define(["require", "exports", "./SexSelect", "../../../../utils/globals/Constants", "../../../../utils/globals/EnumExtensions", "../../../../utils/globals/IoC", "../../../../game/objects/Doll", "../../../../game/enums/Class", "../../../../data/struct/Character", "../../../../components/ui/Panel", "./ProfessionSelect", "./CreateSceneStage", "../../../../utils/globals/StringExtensions"], function (require, exports, SexSelect_1, Constants_1, EnumExtensions_1, IoC_1, Doll_1, Class_1, Character_1, Panel_1, ProfessionSelect_1, CreateSceneStage_1, StringExtensions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ClassSelect extends CreateSceneStage_1.CreateSceneStage {
        constructor() {
            super('Select your class:');
            this.backScene = SexSelect_1.SexSelect;
            this.clear = true;
        }
        async resources() {
            return [
                ...(await super.resources()),
                { key: 'warrior', url: './images/dolls/warrior.png', type: 'spritesheet', args: [32, 32], },
                { key: 'ranger', url: './images/dolls/ranger.png', type: 'spritesheet', args: [32, 32], },
                { key: 'rogue', url: './images/dolls/rogue.png', type: 'spritesheet', args: [32, 32], },
                { key: 'priest', url: './images/dolls/priest.png', type: 'spritesheet', args: [32, 32], },
                { key: 'wizard', url: './images/dolls/wizard.png', type: 'spritesheet', args: [32, 32], },
            ];
        }
        async components() {
            return [
                ...(await super.components()),
                ...this.classTabs
            ];
        }
        get classTabs() {
            let x = Constants_1.Constants.mapOffset.x + 100;
            let y = 232;
            return EnumExtensions_1.enumKeys(Class_1.Class).map(x => x.toLowerCase()).map(element => {
                let character = new Doll_1.Doll(IoC_1.Container.game, 0, 0, element, null, IoC_1.Container.resolve(Character_1.Character).sex);
                character.setAnim("exceptDeath", true);
                let panel = new Panel_1.Panel({ w: x, h: y }, "panel_blue", character, element);
                panel.click = () => { this.selectClass(element); };
                x += panel.width + 16;
                return panel;
            });
        }
        selectClass(_class) {
            IoC_1.Container.resolve(Character_1.Character).class = Class_1.Class[StringExtensions_1.StringExtensions.capitalize(_class)];
            new ProfessionSelect_1.ProfessionSelect().run();
        }
    }
    exports.ClassSelect = ClassSelect;
});

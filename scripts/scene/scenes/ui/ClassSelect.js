define(["require", "exports", "../../../utils/globals/Constants", "../../abstract/BaseBackScene", "../../../game/objects/Doll", "./SexSelect", "../../../ui/impl/text/ManagedText", "../../../utils/globals/IoC", "../../../data/struct/CreateCharacterState", "../../../components/ui/Panel", "../../../game/enums/Class", "../../../utils/globals/EnumExtensions", "./ProfessionSelect"], function (require, exports, Constants_1, BaseBackScene_1, Doll_1, SexSelect_1, ManagedText_1, IoC_1, CreateCharacterState_1, Panel_1, Class_1, EnumExtensions_1, ProfessionSelect_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ClassSelect extends BaseBackScene_1.BaseBackScene {
        constructor() {
            super(...arguments);
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
                this.title,
                ...this.classTabs
            ];
        }
        get title() {
            return new ManagedText_1.ManagedText({
                text: 'Select your class:',
                y: 200,
                fontStyle: {
                    font: 'bold 32pt ' + Constants_1.Constants.fontFamily,
                    fill: Constants_1.Constants.color,
                    align: 'center'
                }
            });
        }
        get classTabs() {
            let x = Constants_1.Constants.mapOffset.x + 100;
            let y = 232;
            return EnumExtensions_1.enumKeys(Class_1.Class).map(x => x.toLowerCase()).map(element => {
                let character = new Doll_1.Doll(IoC_1.Container.game, 0, 0, element, null, IoC_1.Container.resolve(CreateCharacterState_1.CreateCharacterState).sex);
                character.setAnim("exceptDeath", true);
                let panel = new Panel_1.Panel({ w: x, h: y }, "panel_blue", character, element);
                panel.click = () => { this.selectClass(element); };
                x += panel.width + 16;
                return panel;
            });
        }
        selectClass(_class) {
            IoC_1.Container.resolve(CreateCharacterState_1.CreateCharacterState).class = Class_1.Class[_class];
            new ProfessionSelect_1.ProfessionSelect().run();
        }
    }
    exports.ClassSelect = ClassSelect;
});

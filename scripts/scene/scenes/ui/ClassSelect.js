define(["require", "exports", "../../../app/core/impl/ManagedComponent", "../../../utils/globals/Constants", "../../abstract/BaseBackScene", "../../../game/objects/Doll", "./SexSelect", "../../../ui/impl/text/ManagedText", "../../../utils/ui/textfactory/TextFactory", "../../../utils/globals/IoC"], function (require, exports, ManagedComponent_1, Constants_1, BaseBackScene_1, Doll_1, SexSelect_1, ManagedText_1, TextFactory_1, IoC_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ClassSelect extends BaseBackScene_1.BaseBackScene {
        constructor(sex) {
            super();
            this.backScene = SexSelect_1.SexSelect;
            this.clear = true;
            this.sex = sex;
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
            return ["warrior", "ranger", "rogue", "priest", "wizard"].map(element => {
                return new ManagedComponent_1.ManagedComponent(game => {
                    let background = new Phaser.Sprite(game, x, y, Constants_1.Constants.uiAssert, "panel_blue");
                    background.inputEnabled = true;
                    let character = new Doll_1.Doll(game, ((background.width - 64) / 2) + x, ((background.height - 64) / 2) + y, element, null, this.sex);
                    character.setAnim("exceptDeath", true);
                    let text = TextFactory_1.TextFactory.new({
                        text: element,
                        fontSize: 16,
                        y: (background.y + background.height) + 2
                    });
                    text.x = (background.width - text.width) / 2 + background.x;
                    text.inputEnabled = true;
                    x += background.width + 16;
                    let group = new Phaser.Group(game);
                    group.add(background);
                    group.add(character);
                    group.add(text);
                    group.onChildInputOver.add(() => IoC_1.Container.setCursor("point"));
                    group.onChildInputOut.add(() => IoC_1.Container.setCursor('cursor'));
                    group.onChildInputUp.add(() => IoC_1.Container.setCursor('cursor'));
                    group.onChildInputDown.add(() => IoC_1.Container.setCursor('cursor'));
                    game.add.existing(group);
                });
            });
        }
    }
    exports.ClassSelect = ClassSelect;
});

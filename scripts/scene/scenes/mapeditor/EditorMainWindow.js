define(["require", "exports", "../../abstract/BaseBackScene", "../MainMenuScene", "../../../utils/globals/IoC", "../../../ui/impl/buttons/spritebutton/SpriteButton", "../../../utils/globals/StringExtensions", "../../../components/mapeditor/SectionBuilder"], function (require, exports, BaseBackScene_1, MainMenuScene_1, IoC_1, SpriteButton_1, StringExtensions_1, SectionBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EditorMainWindow extends BaseBackScene_1.BaseBackScene {
        constructor() {
            super(...arguments);
            this.backScene = MainMenuScene_1.MainMenuScene;
            this.name = "EditorMainWindow";
            this.clear = true;
        }
        get components() {
            return [
                ...super.components,
                ...this.buttons
            ];
        }
        get buttons() {
            let keys = [
                "walls",
                "floors",
                "decorations",
                "items"
            ];
            return keys.map((section, index) => this.spriteSection(section, (index * 190) + 16));
        }
        spriteSection(section, xOffset) {
            let spriteGroup = new Phaser.Group(IoC_1.Container.game);
            SectionBuilder_1.SectionBuilder.getSection(section).forEach(sprite => spriteGroup.add(sprite));
            spriteGroup.visible = false;
            IoC_1.Container.game.add.existing(spriteGroup);
            return new SpriteButton_1.SpriteButton({
                x: xOffset,
                y: 600,
                initFrame: 'buttonLong_blue',
                pressedFrame: 'buttonLong_blue_pressed',
                text: StringExtensions_1.StringExtensions.capitalize(section),
                events: {
                    up: function () {
                        if (EditorMainWindow.prevGroup) {
                            EditorMainWindow.prevGroup.visible = false;
                        }
                        spriteGroup.visible = true;
                        EditorMainWindow.prevGroup = spriteGroup;
                    }
                }
            });
        }
    }
    exports.EditorMainWindow = EditorMainWindow;
});

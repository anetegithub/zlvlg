define(["require", "exports", "../../abstract/BaseBackScene", "../MainMenuScene", "../../../utils/globals/IoC", "../../../app/core/impl/ManagedComponent", "../../../ui/impl/buttons/spritebutton/SpriteButton", "../../../utils/globals/StringExtensions", "../../../components/mapeditor/MapEditor"], function (require, exports, BaseBackScene_1, MainMenuScene_1, IoC_1, ManagedComponent_1, SpriteButton_1, StringExtensions_1, MapEditor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EditorMainWindow extends BaseBackScene_1.BaseBackScene {
        constructor() {
            super();
            this.backScene = MainMenuScene_1.MainMenuScene;
            this.name = "EditorMainWindow";
            this.clear = true;
            this.editor = new MapEditor_1.MapEditor();
        }
        get components() {
            return [
                ...super.components,
                ...this.buttons,
                this.previewPanel,
                this.mapGrid
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
            let spriteGroup = this.editor.spriteSections(section);
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
        get previewPanel() {
            return new ManagedComponent_1.ManagedComponent(game => game.add.existing(this.editor.previewPanel));
        }
        get mapGrid() {
            return new ManagedComponent_1.ManagedComponent(game => game.add.existing(this.editor.mapGrid));
        }
    }
    exports.EditorMainWindow = EditorMainWindow;
});

define(["require", "exports", "../../abstract/BaseBackScene", "../MainMenuScene", "../../../utils/globals/IoC", "../../../utils/graphics/SpriteMap", "../../../ui/impl/buttons/spritebutton/SpriteButton", "../../../utils/globals/StringExtensions"], function (require, exports, BaseBackScene_1, MainMenuScene_1, IoC_1, SpriteMap_1, SpriteButton_1, StringExtensions_1) {
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
            this.getSection(section, 29, { h: 0, w: 16 })
                .forEach(sprite => spriteGroup.add(sprite));
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
        getSection(section, inRow, offset) {
            var blocks = [];
            var tileMap = SpriteMap_1.SpriteMap.create(IoC_1.Container.game.cache.getJSON('spritesmap'));
            let i = 0;
            let x = 0;
            let y = 650;
            let offsetX = 0;
            let offsetY = 0;
            if (offset) {
                offsetY += offset.h || 0;
                offsetX += offset.w || 0;
            }
            let step = 0;
            let asideMap = [];
            tileMap[section]().forEach(tile => {
                if (i == 17) {
                    i = 0;
                    x = 0;
                }
                debugger;
                y = 650 + (asideMap[i] || 0);
                asideMap[i] = (asideMap[i] || 0) + (tile.frame.h * 2);
                let xx = x + offsetX;
                let yy = y + offsetY;
                x += (tile.frame.w * 2);
                let sprite = new Phaser.Sprite(IoC_1.Container.game, xx, yy, "sprites", tile.filename);
                sprite.scale.x = 2;
                sprite.scale.y = 2;
                blocks.push(sprite);
                i++;
            });
            return blocks;
        }
    }
    exports.EditorMainWindow = EditorMainWindow;
});

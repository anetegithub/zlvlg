define(["require", "exports", "../../abstract/BaseBackScene", "../MainMenuScene", "../../../utils/globals/IoC", "../../../app/core/impl/ManagedComponent", "../../../utils/graphics/SpriteMap"], function (require, exports, BaseBackScene_1, MainMenuScene_1, IoC_1, ManagedComponent_1, SpriteMap_1) {
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
                ...this.getSection("walls", 9),
                ...this.getSection("floors", 15, { w: 300, h: 0 }),
            ];
        }
        get resources() {
            return [
                ...super.resources,
                { key: 'asset', url: './images/environment/assets/calciumtrice simple.png' }
            ];
        }
        get tilemap() {
            return new ManagedComponent_1.ManagedComponent(game => {
                var assetMap = new Phaser.Sprite(game, 0, 0, 'asset');
                assetMap.scale.x = 2;
                assetMap.scale.y = 2;
                game.add.existing(assetMap);
            });
        }
        getSection(section, inRow, offset) {
            var blocks = [];
            var tileMap = SpriteMap_1.SpriteMap.create(IoC_1.Container.game.cache.getJSON('spritesmap'));
            let i = 0;
            let x = 0;
            let y = 600;
            let offsetX = 0;
            let offsetY = 0;
            if (offset) {
                offsetY += offset.h || 0;
                offsetX += offset.w || 0;
            }
            tileMap[section]().forEach(tile => {
                if (i == inRow) {
                    i = 0;
                    y += tile.frame.h * 2;
                }
                x = i * (tile.frame.w * 2);
                let xx = x + offsetX;
                let yy = y + offsetY;
                blocks.push(new ManagedComponent_1.ManagedComponent(game => {
                    let sprite = new Phaser.Sprite(game, xx, yy, "sprites", tile.filename);
                    sprite.scale.x = 2;
                    sprite.scale.y = 2;
                    game.add.existing(sprite);
                }));
                i++;
            });
            return blocks;
        }
        get floor() {
            var blocks = [];
            return blocks;
        }
    }
    exports.EditorMainWindow = EditorMainWindow;
});

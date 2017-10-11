define(["require", "exports", "../../abstract/BaseBackScene", "../MainMenuScene", "../../../app/core/impl/ManagedComponent", "../../../utils/graphics/SpriteMap"], function (require, exports, BaseBackScene_1, MainMenuScene_1, ManagedComponent_1, SpriteMap_1) {
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
                this.lines
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
        get lines() {
            return new ManagedComponent_1.ManagedComponent(game => {
                var tileMap = SpriteMap_1.SpriteMap.create(game.cache.getJSON('spritesmap'));
                let i = 0;
                let x = 0;
                let y = 600;
                tileMap.walls().forEach(tile => {
                    if (i == Math.round(tileMap.walls().length / 2)) {
                        i = 0;
                        y += 64;
                    }
                    x = i * 32;
                    debugger;
                    let sprite = new Phaser.Sprite(game, x, y, "sprites", tile.filename);
                    sprite.scale.x = 2;
                    sprite.scale.y = 2;
                    game.add.existing(sprite);
                    i++;
                });
            });
        }
    }
    exports.EditorMainWindow = EditorMainWindow;
});

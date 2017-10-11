define(["require", "exports", "./BaseScene"], function (require, exports, BaseScene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpriteMapScene extends BaseScene_1.BaseScene {
        get resources() {
            return [
                {
                    key: 'sprites', url: './images/environment/assets/calciumtrice simple.png', type: 'atlas', args: [
                        SpriteMapScene.jsonAtlasUrl,
                        Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
                    ]
                },
                { key: 'spritesmap', url: SpriteMapScene.jsonAtlasUrl, type: 'json' }
            ];
        }
    }
    SpriteMapScene.jsonAtlasUrl = './images/environment/assets/calciumtrice simple.json';
    exports.SpriteMapScene = SpriteMapScene;
});

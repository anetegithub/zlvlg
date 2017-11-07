define(["require", "exports", "./BaseScene"], function (require, exports, BaseScene_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpriteMapScene extends BaseScene_1.BaseScene {
        async resources() {
            return [
                {
                    key: 'sprites', url: './images/environment/assets/fullset.png', type: 'atlas', args: [
                        SpriteMapScene.jsonAtlasUrl,
                        Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
                    ],
                },
                { key: 'spritesmap', url: SpriteMapScene.jsonAtlasUrl, type: 'json' },
                {
                    key: 'uifull', url: './images/ui/assets/uipack_rpg_sheet.png', type: 'atlas', args: [
                        SpriteMapScene.jsonAtlasUi,
                        Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
                    ]
                },
                { key: 'uifullmap', url: SpriteMapScene.jsonAtlasUi, type: 'json' }
            ];
        }
    }
    SpriteMapScene.jsonAtlasUrl = './images/environment/assets/fullset.json';
    SpriteMapScene.jsonAtlasUi = './images/ui/assets/uipack_rpg_sheet.json';
    exports.SpriteMapScene = SpriteMapScene;
});

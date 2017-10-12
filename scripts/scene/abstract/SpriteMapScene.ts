import { BaseScene } from "./BaseScene";

export abstract class SpriteMapScene extends BaseScene {
    private static jsonAtlasUrl = './images/environment/assets/calciumtrice simple.json';
    private static jsonAtlasUi = './images/ui/assets/uipack_rpg_sheet.json';

    protected get resources(): ILoadedResource[] {
        return [
            {
                key: 'sprites', url: './images/environment/assets/calciumtrice simple.png', type: 'atlas', args: [
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
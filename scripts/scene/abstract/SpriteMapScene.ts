import { BaseScene } from "./BaseScene";

export abstract class SpriteMapScene extends BaseScene {
    private static jsonAtlasUrl = './images/environment/assets/calciumtrice simple.json';
    protected get resources(): ILoadedResource[] {
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
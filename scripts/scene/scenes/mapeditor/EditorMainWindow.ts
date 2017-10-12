import { BaseBackScene } from "../../abstract/BaseBackScene";
import { MainMenuScene } from "../MainMenuScene";
import { Container } from "../../../utils/globals/IoC";
import { ManagedComponent } from "../../../app/core/impl/ManagedComponent";
import { Constants } from "../../../utils/globals/Constants";
import { SpriteMap } from "../../../utils/graphics/SpriteMap";
import { SpriteMapScene } from "../../abstract/SpriteMapScene";

export class EditorMainWindow extends BaseBackScene {
    backScene: new (...args: any[]) => IScene = MainMenuScene;
    name: string = "EditorMainWindow";
    clear: boolean = true;

    protected get components(): IManagedComponent[] {
        return [
            ...super.components,
            ...this.getSection("walls", 9),
            ...this.getSection("floors", 15, { w: 300, h: 0 }),
        ]
    }

    protected get resources(): ILoadedResource[] {
        return [
            ...super.resources,
            { key: 'asset', url: './images/environment/assets/calciumtrice simple.png' }
        ];
    }

    get tilemap(): ManagedComponent {
        return new ManagedComponent(game => {
            var assetMap = new Phaser.Sprite(game, 0, 0, 'asset');
            assetMap.scale.x = 2;
            assetMap.scale.y = 2;
            game.add.existing(assetMap);
        });
    }

    private getSection(section: keyof SpriteMap, inRow: number, offset?: Point): ManagedComponent[] {
        var blocks: ManagedComponent[] = [];

        var tileMap = SpriteMap.create(Container.game.cache.getJSON('spritesmap'));
        let i = 0;
        let x = 0;
        let y = 600;


        let offsetX = 0;
        let offsetY = 0;

        if (offset) {
            offsetY += offset.h || 0;
            offsetX += offset.w || 0;
        }

        (tileMap[section] as Function)().forEach(tile => {
            if (i == inRow) {
                i = 0;
                y += tile.frame.h * 2;
            }

            x = i * (tile.frame.w * 2);

            let xx = x + offsetX;
            let yy = y + offsetY;

            blocks.push(new ManagedComponent(game => {
                let sprite = new Phaser.Sprite(game, xx, yy, "sprites", tile.filename);
                sprite.scale.x = 2;
                sprite.scale.y = 2;
                game.add.existing(sprite);
            }));

            i++;
        });

        return blocks;
    }

    get floor(): ManagedComponent[] {
        var blocks: ManagedComponent[] = [];

        return blocks;
    }
}
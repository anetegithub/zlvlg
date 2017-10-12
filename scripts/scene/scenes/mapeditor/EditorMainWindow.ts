import { BaseBackScene } from "../../abstract/BaseBackScene";
import { MainMenuScene } from "../MainMenuScene";
import { Container } from "../../../utils/globals/IoC";
import { ManagedComponent } from "../../../app/core/impl/ManagedComponent";
import { Constants } from "../../../utils/globals/Constants";
import { SpriteMap } from "../../../utils/graphics/SpriteMap";
import { SpriteMapScene } from "../../abstract/SpriteMapScene";
import { SpriteButton } from "../../../ui/impl/buttons/spritebutton/SpriteButton";

export class EditorMainWindow extends BaseBackScene {
    backScene: new (...args: any[]) => IScene = MainMenuScene;
    name: string = "EditorMainWindow";
    clear: boolean = true;

    protected get components(): IManagedComponent[] {
        return [
            ...super.components,
            this.walls
            //...this.getSection("walls", 29),
            //...this.getSection("floors", 15, { w: 300, h: 0 }),
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
        let y = 650;


        let offsetX = 0;
        let offsetY = 0;

        if (offset) {
            offsetY += offset.h || 0;
            offsetX += offset.w || 0;
        }

        let step: number = 0;

        (tileMap[section] as () => SpriteTile[])().forEach(tile => {
            if (i == inRow) {
                i = 0;
                x = 0;
                y += tile.frame.h * 2;
            }

            x += (tile.frame.w * 2);

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

    private get walls(): ManagedComponent {
        return new SpriteButton({
            x: 16,
            y: 600,
            initFrame: 'buttonLong_blue',
            pressedFrame: 'buttonLong_blue_pressed',
            text: 'Walls'
        });
    }

    get floor(): ManagedComponent[] {
        var blocks: ManagedComponent[] = [];

        return blocks;
    }
}
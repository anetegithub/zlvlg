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
            this.lines
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

    get lines(): ManagedComponent {
        return new ManagedComponent(game => {
            var tileMap = SpriteMap.create(game.cache.getJSON('spritesmap'));

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
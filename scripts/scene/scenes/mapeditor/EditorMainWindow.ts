import { BaseBackScene } from "../../abstract/BaseBackScene";
import { MainMenuScene } from "../MainMenuScene";
import { Container } from "../../../utils/globals/IoC";
import { ManagedComponent } from "../../../app/core/impl/ManagedComponent";
import { Constants } from "../../../utils/globals/Constants";
import { SpriteMap } from "../../../utils/graphics/SpriteMap";
import { SpriteMapScene } from "../../abstract/SpriteMapScene";
import { SpriteButton } from "../../../ui/impl/buttons/spritebutton/SpriteButton";
import { StringExtensions } from "../../../utils/globals/StringExtensions";

export class EditorMainWindow extends BaseBackScene {
    backScene: new (...args: any[]) => IScene = MainMenuScene;
    name: string = "EditorMainWindow";
    clear: boolean = true;

    protected get components(): IManagedComponent[] {
        return [
            ...super.components,
            ...this.buttons
        ]
    }

    private get buttons(): ManagedComponent[] {
        type SpriteMapKey = keyof SpriteMap;
        let keys: SpriteMapKey[] = [
            "walls",
            "floors",
            "decorations",
            "items"
        ];
        return keys.map((section, index) => this.spriteSection(section, (index * 190) + 16));
    }

    private static prevGroup: Phaser.Group;
    private spriteSection(section: string, xOffset: number): ManagedComponent {
        let spriteGroup = new Phaser.Group(Container.game);

        this.getSection(section, 29, { h: 0, w: 16 })
            .forEach(sprite => spriteGroup.add(sprite));

        spriteGroup.visible = false;
        Container.game.add.existing(spriteGroup);

        return new SpriteButton({
            x: xOffset,
            y: 600,
            initFrame: 'buttonLong_blue',
            pressedFrame: 'buttonLong_blue_pressed',
            text: StringExtensions.capitalize(section),
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

    private getSection(section: string, inRow: number, offset?: Point): Phaser.Sprite[] {
        var blocks: Phaser.Sprite[] = [];

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
        let asideMap: number[] = [];

        (tileMap[section] as () => SpriteTile[])().forEach(tile => {
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

            let sprite = new Phaser.Sprite(Container.game, xx, yy, "sprites", tile.filename);
            sprite.scale.x = 2;
            sprite.scale.y = 2;

            blocks.push(sprite);

            i++;
        });

        return blocks;
    }
}
import { BaseBackScene } from "../../abstract/BaseBackScene";
import { MainMenuScene } from "../MainMenuScene";
import { Container } from "../../../utils/globals/IoC";
import { ManagedComponent } from "../../../app/core/impl/ManagedComponent";
import { Constants } from "../../../utils/globals/Constants";
import { SpriteMap } from "../../../utils/graphics/SpriteMap";
import { SpriteMapScene } from "../../abstract/SpriteMapScene";
import { SpriteButton } from "../../../ui/impl/buttons/spritebutton/SpriteButton";
import { StringExtensions } from "../../../utils/globals/StringExtensions";
import { SectionBuilder } from "../../../components/mapeditor/SectionBuilder";

export class EditorMainWindow extends BaseBackScene {
    backScene: new (...args: any[]) => IScene = MainMenuScene;
    name: string = "EditorMainWindow";
    clear: boolean = true;

    protected get components(): IManagedComponent[] {
        return [
            ...super.components,
            ...this.buttons,
            this.previewPanel,
            this.mapGrid
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
    private spriteSection(section: keyof SpriteMap, xOffset: number): ManagedComponent {
        let spriteGroup = new Phaser.Group(Container.game);

        SectionBuilder.getSection(section).forEach(sprite => spriteGroup.add(sprite));

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

    private get previewPanel(): IManagedComponent {
        return new ManagedComponent(game => {
            let sprite = new Phaser.Sprite(game, Constants.windowWidth - 100 - Constants.gameWindowOffset.x, Constants.gameWindowOffset.y, "uifull", 'panel_blue');
            game.add.existing(sprite);
        });
    }

    private get mapGrid(): IManagedComponent {
        var grid: IManagedComponent;


        let group = new Phaser.Group(Container.game);
        group.visible = false;

        for (let xCoordinate = Constants.mapOffset.x; xCoordinate <= Constants.mapWidth; xCoordinate += 32) {
            let graph = new Phaser.Graphics(Container.game, xCoordinate, Constants.mapOffset.y);
            graph.lineStyle(1, 0xd3d3d3, 1);
            graph.moveTo(xCoordinate, Constants.mapOffset.y);
            graph.lineTo(xCoordinate, Constants.mapHeight);
            let line = new Phaser.Sprite(Container.game, xCoordinate, Constants.mapOffset.y, graph.generateTexture());
            group.add(line);
        }

        for (let yCoordinate = Constants.mapOffset.y; yCoordinate <= Constants.mapHeight; yCoordinate += 32) {
            let graph = new Phaser.Graphics(Container.game, Constants.mapOffset.x, yCoordinate);
            graph.lineStyle(1, 0xd3d3d3, 1);
            graph.moveTo(Constants.mapOffset.x, yCoordinate);
            graph.lineTo(Constants.mapWidth - Constants.mapOffset.x, yCoordinate);
            let line = new Phaser.Sprite(Container.game, Constants.mapOffset.x, yCoordinate, graph.generateTexture());
            group.add(line);
        }

        grid = new ManagedComponent(game => game.add.existing(group));

        return grid;
    }
}
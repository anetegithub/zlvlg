import { BaseBackScene } from "../../abstract/BaseBackScene";
import { MainMenuScene } from "../MainMenuScene";
import { Container } from "../../../utils/globals/IoC";
import { ManagedComponent } from "../../../app/core/impl/ManagedComponent";
import { Constants } from "../../../utils/globals/Constants";
import { SpriteMap, SpriteTypes } from "../../../utils/graphics/SpriteMap";
import { SpriteMapScene } from "../../abstract/SpriteMapScene";
import { SpriteButton } from "../../../ui/impl/buttons/spritebutton/SpriteButton";
import { StringExtensions } from "../../../utils/globals/StringExtensions";
import { SectionBuilder } from "../../../components/mapeditor/parts/SectionBuilder";
import { MapEditor } from "../../../components/mapeditor/MapEditor";

export class EditorMainWindow extends BaseBackScene {
    backScene: new (...args: any[]) => IScene = MainMenuScene;
    name: string = "EditorMainWindow";
    clear: boolean = true;

    editor: MapEditor;

    constructor() {
        super();
        this.editor = new MapEditor();
    }

    protected get components(): IManagedComponent[] {
        return [
            ...super.components,
            ...this.buttons,
            this.previewPanel,
            this.mapGrid,
            this.download
        ]
    }

    private get buttons(): ManagedComponent[] {
        type SpriteMapKey = keyof SpriteTypes;
        let keys: SpriteMapKey[] = [
            "floors",
            "walls",
            "matery",
            "decore",
            "floorobjects",
            "items",
            "weapons",
            "enemy",
            "people"
        ];
        return keys.map((section, index) => this.spriteSection(section, (index * 45) + 16));
    }

    private static prevGroup: Phaser.Group;
    private spriteSection(section: keyof SpriteTypes, xOffset: number): ManagedComponent {
        let spriteGroup = this.editor.spriteSections(section);
        spriteGroup.visible = false;
        Container.game.add.existing(spriteGroup);

        return new SpriteButton({
            x: xOffset,
            y: 600,
            initFrame: 'buttonSquare_blue',
            pressedFrame: 'buttonSquare_blue_pressed',
            text: StringExtensions.capitalize(section[0]),
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

    private get download(): IManagedComponent {
        return new SpriteButton({
            x: Constants.mapWidth - 60,
            y: Constants.gameWindowOffset.y,
            text: '↓',
            events: {
                down: () => {
                    this.editor.export();
                }
            },
            initFrame: 'buttonSquare_blue',
            pressedFrame: 'buttonSquare_blue_pressed'
        });
    }

    private get previewPanel(): IManagedComponent {
        return new ManagedComponent(game => game.add.existing(this.editor.previewPanel));
    }

    private get mapGrid(): IManagedComponent {
        return new ManagedComponent(game => game.add.existing(this.editor.mapGrid.sprite));
    }
}
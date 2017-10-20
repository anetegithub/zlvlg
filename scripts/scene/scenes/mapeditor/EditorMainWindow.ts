import { BaseBackScene } from "../../abstract/BaseBackScene";
import { MainMenuScene } from "../MainMenuScene";
import { Container } from "../../../utils/globals/IoC";
import { ManagedComponent } from "../../../app/core/impl/ManagedComponent";
import { Constants } from "../../../utils/globals/Constants";
import { SpriteMap } from "../../../utils/graphics/SpriteMap";
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
        let spriteGroup = this.editor.spriteSections(section);
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
        return new ManagedComponent(game => game.add.existing(this.editor.previewPanel));
    }

    private get mapGrid(): IManagedComponent {
        return new ManagedComponent(game => game.add.existing(this.editor.mapGrid));
    }
}
import { BaseScene } from "../abstract/BaseScene";
import { TextButton } from "../../ui/impl/buttons/textbutton/TextButton";
import { Container } from "../../utils/globals/IoC";
import { NicknameInput } from "../scenes/ui/NicknameInput";
import { ManagedText } from "../../ui/impl/text/ManagedText";
import { Constants } from "../../utils/globals/Constants";
import { ManagedComponent } from "../../app/core/impl/ManagedComponent";
import { EditorMainWindow } from "./mapeditor/EditorMainWindow";
import { SpriteMapScene } from "../abstract/SpriteMapScene";

export class MainMenuScene extends SpriteMapScene {
    name: string = "MainMenu";
    clear: boolean = true;

    protected get resources(): ILoadedResource[] {
        return [
            ...super.resources,
            { key: 'logo', url: './images/environment/splash.png' },
        ]
    }

    protected get components(): IManagedComponent[] {
        return [
            this.splash,
            this.newGame,
            this.loadSave,
            this.title,
            this.mapEditor,
            this.license
        ];
    }

    get license(): ManagedComponent {
        return new ManagedComponent(game => {
            var sprite = new Phaser.Sprite(game, 30, 550, 'sprites', 'license');
            sprite.scale.x = 2;
            sprite.scale.y = 2;

            var bmp = game.make.bitmapData(sprite.width, sprite.height - 12);
            bmp.fill(255, 255, 255);

            bmp.addToWorld(30, 550 + 5);
            game.add.existing(sprite);
        });
    }

    get splash(): ManagedComponent {
        return new ManagedComponent(game => {
            var logo = game.add.sprite(game.world.centerX, Constants.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
        });
    }

    get title(): ManagedText {
        var fxdStyle = this.fontStyle;
        fxdStyle.font = `bold 42pt ` + Constants.fontFamily;
        fxdStyle.fill = Constants.color;

        return new ManagedText({
            fontStyle: fxdStyle,
            y: 165,
            text: 'Mystical\nDungeon'
        });
    }

    get newGame(): TextButton {
        var closure = this;
        return new TextButton({
            fontStyle: this.fontStyle,
            y: 365,
            text: 'New Game',
            events: {
                up: function () {
                    new NicknameInput().run();
                }
            }
        });
    }

    get loadSave(): TextButton {
        var style = this.fontStyle;
        style.fill = '#929293';

        return new TextButton({
            fontStyle: style,
            y: 415,
            text: 'Load Game'
        });
    }

    get mapEditor(): TextButton {
        return new TextButton({
            text: 'Map Editor',
            y: 465,
            fontStyle: this.fontStyle,
            events: {
                up: function () {
                    new EditorMainWindow().run();
                }
            }
        });
    }

    private get fontStyle(): Phaser.PhaserTextStyle {
        return {
            font: `bold 24pt  ` + Constants.fontFamily,
            fill: "#FFFFFF",
            align: 'center'
        }
    }
}
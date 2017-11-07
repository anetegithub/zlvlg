import { BaseScene } from "../abstract/BaseScene";
import { TextButton } from "../../ui/impl/buttons/textbutton/TextButton";
import { Container } from "../../utils/globals/IoC";
import { NicknameInput } from "../scenes/ui/NicknameInput";
import { ManagedText } from "../../ui/impl/text/ManagedText";
import { Constants } from "../../utils/globals/Constants";
import { ManagedComponent } from "../../app/core/impl/ManagedComponent";
import { EditorMainWindow } from "./mapeditor/EditorMainWindow";
import { SpriteMapScene } from "../abstract/SpriteMapScene";
import { SpriteButton } from "../../ui/impl/buttons/spritebutton/SpriteButton";
import { Tables } from "../../data/Tables";

export class MainMenuScene extends SpriteMapScene {
    name: string = "MainMenu";
    clear: boolean = true;

    protected async resources(): Promise<ILoadedResource[]> {
        return [
            ...(await super.resources()),
            { key: 'logo', url: './images/environment/splash.png' },
        ]
    }

    protected async components(): Promise<IManagedComponent[]> {
        return [
            this.splash,
            this.newGame,
            await this.loadSave(),
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
            var logo = game.add.sprite(0, 0, 'logo');
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

    get newGame(): IManagedComponent {
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

    async loadSave(): Promise<TextButton> {
        let config: IButtonArgs<Phaser.Text> = {
            y: 415,
            text: 'Load Game'
        };

        if (await Container.db.isempty(Tables.games)) {
            config.events = {
                down: () => {
                    console.log('load');
                }
            }
        } else {
            var style = this.fontStyle;
            style.fill = '#929293';
            config.fontStyle = style;
        }

        return await new TextButton(config);
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
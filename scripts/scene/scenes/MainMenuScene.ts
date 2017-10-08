import { BaseScene } from "../abstract/BaseScene";
import { TextButton } from "../../ui/impl/buttons/textbutton/TextButton";
import { Container } from "../../utils/globals/IoC";
import { NicknameInput } from "../scenes/ui/NicknameInput";
import { ManagedText } from "../../ui/impl/text/ManagedText";
import { Constants } from "../../utils/globals/Constants";
import { ManagedResource } from "../../app/core/impl/ManagedResource";
import { EditorMainWindow } from "./mapeditor/EditorMainWindow";

export class MainMenuScene extends BaseScene {
    name: string = "MainMenu";
    clear: boolean = true;

    constructor() {
        super();

        this.addComponents([
            this.splash,
            this.newGame,
            this.loadSave,
            this.title,
            this.mapEditor
        ]);

        this.load([
            { key: 'logo', url: './images/environment/splash.png' }
        ]);
    }

    get splash(): ManagedResource {
        return new ManagedResource(game => {
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
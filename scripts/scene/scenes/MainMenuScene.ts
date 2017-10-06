import { BaseScene } from "../abstract/BaseScene";
import { TextButton } from "../../ui/impl/buttons/textbutton/TextButton";
import { Container } from "../../utils/globals/IoC";
import { NicknameInput } from "../scenes/ui/NicknameInput";
import { ManagedText } from "../../ui/impl/text/ManagedText";
import { Constants } from "../../utils/globals/Constants";
import { ManagedResource } from "../../app/core/impl/ManagedResource";

export class MainMenuScene extends BaseScene {
    protected loaderRes: { key: string; url: string; type?: string; }[] = [
        { key: 'logo', url: './images/environment/splash.png' }
    ];

    protected resources: IManagedResource[] = [
        this.splash(),
        this.newGame(),
        this.load(),
        this.title()
    ];

    name: string = "MainMenu";
    clear: boolean = false;

    splash(): ManagedResource {
        return new ManagedResource(game => {
            var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
        });
    }

    title(): ManagedText {
        var fxdStyle = this.fontStyle;
        fxdStyle.font = `bold 42pt ` + Constants.fontFamily;
        fxdStyle.fill = Constants.color;

        return new ManagedText({
            fontStyle: fxdStyle,
            y: 165,
            text: 'Mystical\nDungeon'
        });
    }

    newGame(): TextButton {
        var closure = this;
        return new TextButton({
            fontStyle: this.fontStyle,
            y: 365,
            text: 'New Game',
            events: {
                over: function () {
                    var fxdStyle = closure.fontStyle;
                    fxdStyle.fill = Constants.color;
                    this.setStyle(fxdStyle, true);
                },
                out: function () {
                    this.setStyle(closure.fontStyle, true);
                },
                down: function () {
                    var fxdStyle = closure.fontStyle;
                    fxdStyle.font = `bold 20pt  ` + Constants.fontFamily;
                    fxdStyle.fill = Constants.color;
                    this.setStyle(fxdStyle, true);
                },
                up: function () {
                    Container.sceneMgr.next(NicknameInput);
                }
            }
        });
    }

    load(): TextButton {
        var style = this.fontStyle;
        style.fill = '#929293';

        return new TextButton({
            fontStyle: style,
            y: 415,
            text: 'Load Game'
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
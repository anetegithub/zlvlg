import { BaseScene } from "../abstract/BaseScene";
import { TextButton } from "../../ui/impl/buttons/textbutton/TextButton";
import { Container } from "../../utils/globals/IoC";
import { NicknameInput } from "../scenes/ui/NicknameInput";

export class MainMenuScene extends BaseScene {
    protected resources: IManagedResource[] = [
        this.newGame(),
        this.load()
    ];

    name: string = "MainMenu";
    clear: boolean = false;

    newGame(): TextButton {
        var closure = this;
        return new TextButton({
            fontStyle: this.fontStyle,
            y: 365,
            text: 'New Game',
            events: {
                over: function () {
                    var fxdStyle = closure.fontStyle;
                    fxdStyle.fill = '#45cc5b';
                    this.setStyle(fxdStyle, true);
                },
                out: function () {
                    this.setStyle(closure.fontStyle, true);
                },
                down: function () {
                    var fxdStyle = closure.fontStyle;
                    fxdStyle.font = `bold 20pt TheMinion`;
                    fxdStyle.fill = '#45cc5b';
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
            font: `bold 24pt TheMinion`,
            fill: "#FFFFFF",
            align: 'center'
        }
    }
}
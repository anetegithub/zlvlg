import { BaseScene } from "../abstract/BaseScene";
import { TextButton } from "../../ui/impl/buttons/textbutton/TextButton";

export class MainMenuScene extends BaseScene {
    protected resources: IManagedResource[] = [
        this.newGame(),
        this.load()
    ];

    name: string = "MainMenu";
    clear: boolean = false;

    newGame(): TextButton {
        return new TextButton({
            size: 24,
            y: 365,
            text: 'New Game',
            events: {
                over: function () {
                    this.setStyle({
                        fill: '#45cc5b'
                    })
                },
                out: function () {
                    this.setStyle({
                        fill: '#FFFFFF'
                    })
                }
            }
        });
    }

    load(): TextButton {
        return new TextButton({
            size: 24,
            y: 415,
            text: 'Load Game',
            color: '#929293'
        });
    }
}
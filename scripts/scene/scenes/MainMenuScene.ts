import { BaseScene } from "../abstract/BaseScene";
import { TextButton } from "../../ui/impl/buttons/TextButton";
import { Container } from "../../utils/globals/IoC";

export class MainMenuScene extends BaseScene {
    protected resources: IManagedResource[] = [
        this.newGame()
    ];

    name: string = "MainMenu";
    clear: boolean = false;

    newGame(): TextButton {
        return new TextButton({
            size: 24,
            y: 200,
            text: 'New Game'
        });
    }
}
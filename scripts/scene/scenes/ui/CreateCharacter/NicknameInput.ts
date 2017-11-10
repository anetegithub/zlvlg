import { BaseBackScene } from "../../../abstract/BaseBackScene";
import { MainMenuScene } from "../../MainMenuScene";
import { ManagedText } from "../../../../ui/impl/text/ManagedText";
import { Constants } from "../../../../utils/globals/Constants";
import { ManagedComponent } from "../../../../app/core/impl/ManagedComponent";
import { SpriteButton } from "../../../../ui/impl/buttons/spritebutton/SpriteButton";
import { Container } from "../../../../utils/globals/IoC";
import { Character } from "../../../../data/struct/Character";
import { SexSelect } from "./SexSelect";
import { CreateSceneStage } from "./CreateSceneStage";

export class NicknameInput extends CreateSceneStage {
    backScene = MainMenuScene;

    name: string = 'NicknameInput';
    clear: boolean = true;

    constructor() {
        super('Your Nickname:');
    }

    async components(): Promise<IManagedComponent[]> {
        return [
            ...(await super.components()),
            this.input,
            this.okButton
        ];
    }

    inputElement: PhaserInput.InputField;

    private get input(): ManagedComponent {
        return new ManagedComponent(game => {
            this.inputElement = new PhaserInput.InputField(game, (game.world.centerX / 2) + 15, Constants.centerY, {
                font: '28px ' + Constants.fontFamily,
                fill: '#ffffff',
                fontWeight: 'bold',
                backgroundColor: '#000000',
                width: game.world.centerX - 120,
                padding: 8,
                borderWidth: 2,
                borderColor: Constants.color,
                borderRadius: 10,
                type: PhaserInput.InputType.text,
                textAlign: 'center',
                align: 'center',
                max: '17'
            });
            this.inputElement.input.useHandCursor = false;

            this.inputElement.events.onInputOver.add(() => this.setPointer('hand'));
            this.inputElement.events.onInputOut.add(() => this.setPointer('cursor'));

            game.add.existing(this.inputElement);
        });
    }

    private setPointer(name: string) {
        document.getElementById('content').style.cursor = `url("./images/ui/cursors/${name}.png"), auto`;
    }

    private get okButton(): SpriteButton {
        return new SpriteButton({
            x: (Container.game.world.centerX / 2) + 335,
            y: Constants.centerY,
            text: 'Ok',
            events: {
                down: () => { this.ok(); }
            },
            initFrame: 'buttonSquare_blue',
            pressedFrame: 'buttonSquare_blue_pressed'
        });
    }

    private ok() {
        const value = this.inputElement.value
        if (value) {
            let charState = new Character();
            charState.name = value;
            Container.register(Character, charState);
            new SexSelect().run();
        }
    }
}
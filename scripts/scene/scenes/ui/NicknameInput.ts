import { BaseScene } from "../../abstract/BaseScene";
import { ManagedText } from "../../../ui/impl/text/ManagedText";
import { Container } from "../../../utils/globals/IoC";
import { ManagedComponent } from "../../../app/core/impl/ManagedComponent";
import { Constants } from "../../../utils/globals/Constants";
import { SpriteButton } from "../../../ui/impl/buttons/spritebutton/SpriteButton";
import { } from "../../../../node_modules/@orange-games/phaser-input/build/phaser-input";
import { BaseBackScene } from "../../abstract/BaseBackScene";
import { MainMenuScene } from "../MainMenuScene";
import { ClassSelect } from "./ClassSelect";
import { SexSelect } from "./SexSelect";
import { CreateCharacterState } from "../../../data/struct/CreateCharacterState";

export class NicknameInput extends BaseBackScene {
    backScene = MainMenuScene;

    name: string = 'NicknameInput';
    clear: boolean = true;

    async components(): Promise<IManagedComponent[]> {
        return [
            ...(await super.components()),
            this.title,
            this.input,
            this.okButton
        ];
    }

    private get title(): ManagedText {
        return new ManagedText({
            text: 'Your Nickname:',
            y: 200,
            fontStyle: {
                font: 'bold 32pt ' + Constants.fontFamily,
                fill: Constants.color,
                align: 'center'
            }
        })
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
                down: () => {
                    const value = this.inputElement.value
                    if (value) {
                        let charState = new CreateCharacterState();
                        charState.name = value;
                        Container.register("createCharater", charState);
                        new SexSelect().run();
                    }
                }
            },
            initFrame: 'buttonSquare_blue',
            pressedFrame: 'buttonSquare_blue_pressed'
        });
    }
}
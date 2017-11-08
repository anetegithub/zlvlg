import { BaseBackScene } from "../../abstract/BaseBackScene";
import { NicknameInput } from "./NicknameInput";
import { SpriteButton } from "../../../ui/impl/buttons/spritebutton/SpriteButton";
import { Sex } from "../../../game/enums/Sex";
import { ClassSelect } from "./ClassSelect";
import { ManagedText } from "../../../ui/impl/text/ManagedText";
import { Constants } from "../../../utils/globals/Constants";
import { Container } from "../../../utils/globals/IoC";
import { CreateCharacterState } from "../../../data/struct/CreateCharacterState";

export class SexSelect extends BaseBackScene {
    backScene: new (...args: any[]) => IScene = NicknameInput;
    clear: boolean = true;

    async components(): Promise<IManagedComponent[]> {
        return [
            ...(await super.components()),
            this.title,
            this.sexButton(Sex.Male),
            this.sexButton(Sex.Female)
        ]
    }

    get title(): IManagedComponent {
        return new ManagedText({
            text: 'Your sex:',
            y: 200,
            fontStyle: {
                font: 'bold 32pt ' + Constants.fontFamily,
                fill: Constants.color,
                align: 'center'
            }
        })
    }

    private sexButton(sex: Sex): SpriteButton {
        return new SpriteButton({
            text: sex == Sex.Male ? '♂' : '♀',
            initFrame: 'buttonSquare_blue',
            pressedFrame: 'buttonSquare_blue_pressed',
            x: Constants.centerX - 60 + (sex * 60),
            y: Constants.centerY - 20,
            events: {
                down: () => {
                    this.chooseSex(sex);
                }
            }
        });
    }

    private chooseSex(sex: Sex) {
        Container.resolve(CreateCharacterState).sex = sex;
        new ClassSelect().run();
    }
}
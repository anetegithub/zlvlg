import { BaseBackScene } from "../../../abstract/BaseBackScene";
import { NicknameInput } from "./NicknameInput";
import { Sex } from "../../../../game/enums/Sex";
import { ManagedText } from "../../../../ui/impl/text/ManagedText";
import { Constants } from "../../../../utils/globals/Constants";
import { SpriteButton } from "../../../../ui/impl/buttons/spritebutton/SpriteButton";
import { CreateCharacterState } from "../../../../data/struct/CreateCharacterState";
import { Container } from "../../../../utils/globals/IoC";
import { ClassSelect } from "./ClassSelect";
import { CreateSceneStage } from "./CreateSceneStage";

export class SexSelect extends CreateSceneStage {
    backScene: new (...args: any[]) => IScene = NicknameInput;
    clear: boolean = true;

    constructor() {
        super('Your sex:');
    }

    async components(): Promise<IManagedComponent[]> {
        return [
            ...(await super.components()),
            this.sexButton(Sex.Male),
            this.sexButton(Sex.Female)
        ]
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
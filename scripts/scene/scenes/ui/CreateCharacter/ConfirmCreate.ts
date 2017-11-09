import { CreateSceneStage } from "./CreateSceneStage";
import { ProfessionSelect } from "./ProfessionSelect";
import { Container } from "../../../../utils/globals/IoC";
import { CreateCharacterState } from "../../../../data/struct/CreateCharacterState";
import { ManagedText } from "../../../../ui/impl/text/ManagedText";
import { Constants } from "../../../../utils/globals/Constants";
import { SpriteButton } from "../../../../ui/impl/buttons/spritebutton/SpriteButton";
import { Class } from "../../../../game/enums/Class";
import { Profession } from "../../../../game/enums/Profession";

export class ConfirmCreate extends CreateSceneStage {
    backScene: new (...args: any[]) => IScene = ProfessionSelect;
    clear: boolean = true;

    constructor() {
        super('Confirm:');
    }

    async components(): Promise<IManagedComponent[]> {
        return [
            ...(await super.components()),
            ...this.info,
            this.ok
        ];
    }

    get info(): IManagedComponent[] {
        const info = Container.resolve(CreateCharacterState);
        return [
            this.text("name: " + info.name, 250),
            this.text("class: " + Class[info.class], 290),
            this.text("proffession: " + info.proffesion, 330)
        ]
    }

    get ok(): IManagedComponent {
        return new SpriteButton({
            text: 'ok',
            initFrame: 'buttonSquare_blue',
            pressedFrame: 'buttonSquare_blue_pressed',
            x: Constants.centerX - 22.5,
            y: 375,
            events: {
                down: () => { this.okAction(); }
            }
        });
    }

    okAction() {
        console.log('created');
    }

    private text(val: string, y: number): ManagedText {
        return new ManagedText({
            text: val,
            y: y,
            x: 225,
            fontStyle: {
                font: 'bold 20pt ' + Constants.fontFamily,
                fill: Constants.color,
                align: 'left',
                boundsAlignH: "left"
            },
            anchor: 0,
            boundsAlignH: "left"
        })
    }
}
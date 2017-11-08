import { BaseBackScene } from "../../../abstract/BaseBackScene";
import { MainMenuScene } from "../../MainMenuScene";
import { ManagedText } from "../../../../ui/impl/text/ManagedText";
import { Constants } from "../../../../utils/globals/Constants";
import { ManagedComponent } from "../../../../app/core/impl/ManagedComponent";
import { SpriteButton } from "../../../../ui/impl/buttons/spritebutton/SpriteButton";
import { Container } from "../../../../utils/globals/IoC";
import { CreateCharacterState } from "../../../../data/struct/CreateCharacterState";
import { SexSelect } from "./SexSelect";

export abstract class CreateSceneStage extends BaseBackScene {
    private titleText: string;
    constructor(title: string) {
        super();
        this.titleText = title;
    }

    async components(): Promise<IManagedComponent[]> {
        return [
            ...(await super.components()),
            this.title
        ];
    }

    private get title(): ManagedText {
        return new ManagedText({
            text: this.titleText,
            y: 200,
            fontStyle: {
                font: 'bold 32pt ' + Constants.fontFamily,
                fill: Constants.color,
                align: 'center'
            }
        });
    }
}
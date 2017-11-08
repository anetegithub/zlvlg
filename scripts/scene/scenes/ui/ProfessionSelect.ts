import { BaseBackScene } from "../../abstract/BaseBackScene";
import { ClassSelect } from "./ClassSelect";
import { ManagedText } from "../../../ui/impl/text/ManagedText";
import { Constants } from "../../../utils/globals/Constants";
import { Profession } from "../../../game/enums/Profession";
import { Container } from "../../../utils/globals/IoC";
import { Panel } from "../../../components/ui/Panel";
import { CreateCharacterState } from "../../../data/struct/CreateCharacterState";

export class ProfessionSelect extends BaseBackScene {
    backScene: new (...args: any[]) => IScene = ClassSelect;
    clear: boolean = true;

    protected async components(): Promise<IManagedComponent[]> {
        return [
            ...(await super.components()),
            this.title,
            ...this.profTabs
        ];
    }

    get title(): IManagedComponent {
        return new ManagedText({
            text: 'Select your profession:',
            y: 185,
            fontStyle: {
                font: 'bold 32pt ' + Constants.fontFamily,
                fill: Constants.color,
                align: 'center'
            }
        });
    }

    private get profTabs(): IManagedComponent[] {
        let x = Constants.mapOffset.x + 115;
        let y = 264;

        return Object.keys(Profession).map(enumKey => {
            console.log(enumKey);
            let prof = new Phaser.Sprite(Container.game, 0, 0, Constants.spriteAssert, Profession[enumKey]);
            prof.scale.x = 2;
            prof.scale.y = 2;

            let panel = new Panel({ w: x, h: y }, "buttonSquare_blue", prof, enumKey);

            x += panel.width + 78;

            return panel;
        });
    }
}
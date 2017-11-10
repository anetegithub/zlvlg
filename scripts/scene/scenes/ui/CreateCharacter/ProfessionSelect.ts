import { BaseBackScene } from "../../../abstract/BaseBackScene";
import { ClassSelect } from "./ClassSelect";
import { ManagedText } from "../../../../ui/impl/text/ManagedText";
import { Constants } from "../../../../utils/globals/Constants";
import { Profession } from "../../../../game/enums/Profession";
import { Container } from "../../../../utils/globals/IoC";
import { Panel } from "../../../../components/ui/Panel";
import { Character } from "../../../../data/struct/Character";
import { CreateSceneStage } from "./CreateSceneStage";
import { ConfirmCreate } from "./ConfirmCreate";

export class ProfessionSelect extends CreateSceneStage {
    backScene: new (...args: any[]) => IScene = ClassSelect;
    clear: boolean = true;

    constructor() {
        super("Select your profession:");
    }

    async components(): Promise<IManagedComponent[]> {
        return [
            ...(await super.components()),
            ...this.profTabs
        ];
    }

    private get profTabs(): IManagedComponent[] {
        let x = Constants.mapOffset.x + 115;
        let y = 264;

        return Object.keys(Profession).map(enumKey => {
            let prof = new Phaser.Sprite(Container.game, 0, 0, Constants.spriteAssert, Profession[enumKey]);
            prof.scale.x = 2;
            prof.scale.y = 2;

            let panel = new Panel({ w: x, h: y }, "buttonSquare_blue", prof, enumKey);
            panel.click = () => { this.setProf(enumKey); };

            x += panel.width + 78;

            return panel;
        });
    }

    private setProf(prof: string) {
        Container.resolve(Character).proffesion = prof;
        new ConfirmCreate().run();
    }
}
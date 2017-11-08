import { BaseBackScene } from "../../../abstract/BaseBackScene";
import { SexSelect } from "./SexSelect";
import { ManagedText } from "../../../../ui/impl/text/ManagedText";
import { Constants } from "../../../../utils/globals/Constants";
import { enumKeys } from "../../../../utils/globals/EnumExtensions";
import { Container } from "../../../../utils/globals/IoC";
import { Doll } from "../../../../game/objects/Doll";
import { Class } from "../../../../game/enums/Class";
import { CreateCharacterState } from "../../../../data/struct/CreateCharacterState";
import { Panel } from "../../../../components/ui/Panel";
import { ProfessionSelect } from "./ProfessionSelect";
import { CreateSceneStage } from "./CreateSceneStage";
import { StringExtensions } from "../../../../utils/globals/StringExtensions";

export class ClassSelect extends CreateSceneStage {
    backScene: new (...args: any[]) => IScene = SexSelect;
    name: string;
    clear: boolean = true;

    constructor() {
        super('Select your class:');
    }

    protected async resources(): Promise<ILoadedResource[]> {
        return [
            ...(await super.resources()),
            { key: 'warrior', url: './images/dolls/warrior.png', type: 'spritesheet', args: [32, 32], },
            { key: 'ranger', url: './images/dolls/ranger.png', type: 'spritesheet', args: [32, 32], },
            { key: 'rogue', url: './images/dolls/rogue.png', type: 'spritesheet', args: [32, 32], },
            { key: 'priest', url: './images/dolls/priest.png', type: 'spritesheet', args: [32, 32], },
            { key: 'wizard', url: './images/dolls/wizard.png', type: 'spritesheet', args: [32, 32], },
        ];
    }

    async components(): Promise<IManagedComponent[]> {
        return [
            ...(await super.components()),
            ...this.classTabs
        ];
    }

    private get classTabs(): IManagedComponent[] {
        let x = Constants.mapOffset.x + 100;
        let y = 232;

        return enumKeys(Class).map(x => x.toLowerCase()).map(element => {
            let character = new Doll(Container.game, 0, 0, element, null, Container.resolve(CreateCharacterState).sex);
            character.setAnim("exceptDeath", true);

            let panel = new Panel({ w: x, h: y }, "panel_blue", character, element);
            panel.click = () => { this.selectClass(element); };

            x += panel.width + 16;

            return panel;
        });
    }

    private selectClass(_class: string) {
        Container.resolve(CreateCharacterState).class = Class[StringExtensions.capitalize(_class)];
        new ProfessionSelect().run();
    }
}
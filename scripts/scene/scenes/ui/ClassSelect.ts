import { SpriteMapScene } from "../../abstract/SpriteMapScene";
import { ManagedComponent } from "../../../app/core/impl/ManagedComponent";
import { Constants } from "../../../utils/globals/Constants";
import { TextButton } from "../../../ui/impl/buttons/textbutton/TextButton";
import { BaseBackScene } from "../../abstract/BaseBackScene";
import { Doll } from "../../../game/objects/Doll";
import { Sex } from "../../../game/enums/Sex";
import { SexSelect } from "./SexSelect";
import { ManagedText } from "../../../ui/impl/text/ManagedText";
import { TextFactory } from "../../../utils/ui/textfactory/TextFactory";
import { EventApplier } from "../../../utils/ui/EventApplier";
import { Container } from "../../../utils/globals/IoC";
import { CreateCharacterState } from "../../../data/struct/CreateCharacterState";
import { Panel } from "../../../components/ui/Panel";
import { Class } from "../../../game/enums/Class";
import { enumKeys } from "../../../utils/globals/EnumExtensions";
import { ProfessionSelect } from "./ProfessionSelect";

export class ClassSelect extends BaseBackScene {
    backScene: new (...args: any[]) => IScene = SexSelect;
    name: string;
    clear: boolean = true;

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

    protected async components(): Promise<IManagedComponent[]> {
        return [
            ...(await super.components()),
            this.title,
            ...this.classTabs
        ];
    }

    get title(): IManagedComponent {
        return new ManagedText({
            text: 'Select your class:',
            y: 200,
            fontStyle: {
                font: 'bold 32pt ' + Constants.fontFamily,
                fill: Constants.color,
                align: 'center'
            }
        });
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
        Container.resolve(CreateCharacterState).class = Class[_class];
        new ProfessionSelect().run();
    }
}
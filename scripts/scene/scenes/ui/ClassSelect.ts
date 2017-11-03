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

export class ClassSelect extends BaseBackScene {
    backScene: new (...args: any[]) => IScene = SexSelect;
    name: string;
    clear: boolean = true;
    private sex: Sex;

    constructor(sex: Sex) {
        super();
        this.sex = sex;
    }

    protected get resources(): ILoadedResource[] {
        return [
            ...super.resources,
            { key: 'warrior', url: './images/dolls/warrior.png', type: 'spritesheet', args: [32, 32], },
            { key: 'ranger', url: './images/dolls/ranger.png', type: 'spritesheet', args: [32, 32], },
            { key: 'rogue', url: './images/dolls/rogue.png', type: 'spritesheet', args: [32, 32], },
            { key: 'priest', url: './images/dolls/priest.png', type: 'spritesheet', args: [32, 32], },
            { key: 'wizard', url: './images/dolls/wizard.png', type: 'spritesheet', args: [32, 32], },
        ];
    }

    protected get components(): IManagedComponent[] {
        return [
            ...super.components,
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
        return ["warrior", "ranger", "rogue", "priest", "wizard"].map(element => {
            return new ManagedComponent(game => {
                let background = new Phaser.Sprite(game, x, y, Constants.uiAssert, "panel_blue");

                let character = new Doll(game, ((background.width - 64) / 2) + x, ((background.height - 64) / 2) + y, element, null, this.sex);
                character.setAnim("exceptDeath", true);

                let text = TextFactory.new({
                    text: element,
                    fontSize: 16,
                    y: (background.y + background.height) + 2
                });
                text.x = (background.width - text.width) / 2 + background.x;

                x += background.width + 16;

                game.add.existing(background);
                game.add.existing(character);
                game.add.existing(text);
            });
        });
    }
}
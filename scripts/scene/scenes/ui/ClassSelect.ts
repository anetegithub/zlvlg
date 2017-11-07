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

export class ClassSelect extends BaseBackScene {
    backScene: new (...args: any[]) => IScene = SexSelect;
    name: string;
    clear: boolean = true;
    private sex: Sex;

    constructor(sex: Sex) {
        super();
        this.sex = sex;
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
        return ["warrior", "ranger", "rogue", "priest", "wizard"].map(element => {
            return new ManagedComponent(game => {
                let background = new Phaser.Sprite(game, x, y, Constants.uiAssert, "panel_blue");
                background.inputEnabled = true;

                let character = new Doll(game, ((background.width - 64) / 2) + x, ((background.height - 64) / 2) + y, element, null, this.sex);
                character.setAnim("exceptDeath", true);

                let text = TextFactory.new({
                    text: element,
                    fontSize: 16,
                    y: (background.y + background.height) + 2
                });
                text.x = (background.width - text.width) / 2 + background.x;
                text.inputEnabled = true;

                x += background.width + 16;

                let group = new Phaser.Group(game);
                group.add(background);
                group.add(character);
                group.add(text);

                group.onChildInputOver.add(() => Container.setCursor("point"));
                group.onChildInputOut.add(() => Container.setCursor('cursor'));
                group.onChildInputUp.add(() => Container.setCursor('cursor'));
                group.onChildInputDown.add(() => Container.setCursor('cursor'));

                game.add.existing(group);
            });
        });
    }
}
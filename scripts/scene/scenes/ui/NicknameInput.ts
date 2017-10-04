import { BaseScene } from "../../abstract/BaseScene";
import { ManagedText } from "../../../ui/impl/text/ManagedText";
import { Container } from "../../../utils/globals/IoC";
import { ManagedResource } from "../../../app/core/impl/ManagedResource";
import { Constants } from "../../../utils/globals/Constants";
import { SpriteButton } from "../../../ui/impl/buttons/spritebutton/SpriteButton";
import { } from "../../../../node_modules/@orange-games/phaser-input/build/phaser-input";

export class NicknameInput extends BaseScene {
    protected loaderRes: { key: string; url: string; type?: string; }[] = [
        { key: 'sqbtninit', url: './images/ui/sqbtn/init.png' },
        { key: 'sqbtnover', url: './images/ui/sqbtn/over.png' },
        { key: 'sqbtndown', url: './images/ui/sqbtn/down.png' },
    ];

    name: string = 'NicknameInput';
    clear: boolean = true;

    protected resources: IManagedResource[] = [
        this.title(),
        this.input(),
        this.okButton()
    ];

    private title(): ManagedText {
        return new ManagedText({
            text: 'Your Nickname:',
            y: 200,
            fontStyle: {
                font: 'bold 32pt TheMinion',
                fill: Constants.color,
                align: 'center'
            }
        })
    }

    private input(): ManagedResource {
        return new ManagedResource(game => {
            let input = new PhaserInput.InputField(game, (game.world.centerX / 2) + 15, game.world.centerY, {
                font: '28px TheMinion',
                fill: '#ffffff',
                fontWeight: 'bold',
                backgroundColor: '#000000',
                width: game.world.centerX - 145,
                padding: 8,
                borderWidth: 2,
                borderColor: Constants.color,
                borderRadius: 10,
                type: PhaserInput.InputType.text,
                textAlign: 'center',
                align: 'center',
                max: '20'
            });
            game.add.existing(input);
        });
    }

    private okButton(): SpriteButton {
        return new SpriteButton({
            x: (Container.game.world.centerX / 2) + 300,
            y: Container.game.world.centerY,
            text: 'Ok',
            click: null,
            initSpriteKey: 'sqbtninit',
            overSpriteKey: 'sqbtnover',
            pressSpriteKey: 'sqbtndown'
        });
    }
}

Container.onInited(() => {
    Container.sceneMgr.add(new NicknameInput());
});
import { BaseScene } from "../../abstract/BaseScene";
import { ManagedText } from "../../../ui/impl/text/ManagedText";
import { Container } from "../../../utils/globals/IoC";
import { ManagedResource } from "../../../app/core/impl/ManagedResource";
import { } from "../../../../node_modules/@orange-games/phaser-input/build/phaser-input";

export class NicknameInput extends BaseScene {
    name: string = 'NicknameInput';
    clear: boolean = true;

    protected resources: IManagedResource[] = [
        this.title(),
        this.input()
    ];

    private title(): ManagedText {
        return new ManagedText({
            text: 'Your Nickname:',
            y: 200,
            fontStyle: {
                font: 'bold 32pt TheMinion',
                fill: '#45ea3f',
                align: 'center'
            }
        })
    }

    private input(): ManagedResource {
        return new ManagedResource(game => {
            var input = new PhaserInput.InputField(game, game.world.centerX, game.world.centerY, {
                font: '18pt TheMinion',
                fill: '#45ea3f',
                width: 200,
                max: "20",
                type: PhaserInput.InputType.text
            });
        });
    }
}

Container.onInited(() => {
    Container.sceneMgr.add(new NicknameInput());
});
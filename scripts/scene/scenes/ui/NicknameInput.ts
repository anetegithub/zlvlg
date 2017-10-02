import { BaseScene } from "../../abstract/BaseScene";
import { ManagedText } from "../../../ui/impl/text/ManagedText";
import { Container } from "../../../utils/globals/IoC";

export class NicknameInput extends BaseScene {
    name: string = 'NicknameInput';
    clear: boolean = true;

    protected resources: IManagedResource[] = [
        this.title()
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
}

Container.sceneMgr.add(new NicknameInput());
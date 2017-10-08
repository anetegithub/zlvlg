import { BaseScene } from "./BaseScene";
import { ManagedResource } from "../../app/core/impl/ManagedResource";
import { Constants } from "../../utils/globals/Constants";
import { SpriteButton } from "../../ui/impl/buttons/spritebutton/SpriteButton";
import { Container } from "../../utils/globals/IoC";

export abstract class BaseBackScene extends BaseScene {
    constructor() {
        super();

        this.addComponents([
            this.backBtn
        ]);

        this.load([
            { key: 'sqbtninit', url: './images/ui/sqbtn/init.png' },
            { key: 'sqbtndown', url: './images/ui/sqbtn/down.png' },
        ])
    }

    get backBtn(): IManagedResource {
        var closure = this;

        return new SpriteButton({
            x: 25,
            y: 25,
            text: '←',
            events: {
                up: () => {
                    if (this.onBack) {
                        this.onBack();
                    }
                    new closure.backScene().run();
                }
            },
            initSpriteKey: 'sqbtninit',
            pressSpriteKey: 'sqbtndown'
        });
    }

    abstract backScene: new (...args) => IScene;

    protected onBack: Function;
}
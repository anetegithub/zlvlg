import { BaseScene } from "./BaseScene";
import { ManagedResource } from "../../app/core/impl/ManagedResource";
import { Constants } from "../../utils/globals/Constants";
import { SpriteButton } from "../../ui/impl/buttons/spritebutton/SpriteButton";
import { Container } from "../../utils/globals/IoC";

export abstract class BaseBackScene extends BaseScene {
    virtualResources = [
        this.backBtn()
    ];

    backBtn(): IManagedResource {
        var closure = this;

        return new SpriteButton({
            x: 25,
            y: 25,
            text: '←',
            events: {
                up: () => { debugger; Container.sceneMgr.next(closure.backScene); }
            },
            initSpriteKey: 'sqbtninit',
            pressSpriteKey: 'sqbtndown'
        });
    }

    abstract backScene: new (...args) => IScene;
}
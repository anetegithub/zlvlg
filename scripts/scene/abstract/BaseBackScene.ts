import { BaseScene } from "./BaseScene";
import { ManagedComponent } from "../../app/core/impl/ManagedComponent";
import { Constants } from "../../utils/globals/Constants";
import { SpriteButton } from "../../ui/impl/buttons/spritebutton/SpriteButton";
import { Container } from "../../utils/globals/IoC";
import { SpriteMapScene } from "./SpriteMapScene";

export abstract class BaseBackScene extends SpriteMapScene {

    protected get resources(): ILoadedResource[] {
        return [
            ...super.resources
        ]
    }

    protected get components(): IManagedComponent[] {
        return [
            this.backBtn
        ];
    }

    get backBtn(): IManagedComponent {
        var closure = this;

        return new SpriteButton({
            x: 16,
            y: 16,
            text: '<',
            events: {
                up: () => {
                    if (this.onBack) {
                        this.onBack();
                    }
                    new closure.backScene().run();
                }
            },
            initFrame: 'buttonSquare_blue',
            pressedFrame: 'buttonSquare_blue_pressed'
        });
    }

    abstract backScene: new (...args) => IScene;

    protected onBack: Function;
}
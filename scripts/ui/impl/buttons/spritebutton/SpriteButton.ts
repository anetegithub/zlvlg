import { SpriteButtonArgs } from "./SpriteButtonArgs";
import { ManagedText } from "../../text/ManagedText";
import { } from "../../../../app/core/interfaces/IManagedResource";
import { Constants } from "../../../../utils/globals/Constants";
import { BaseButton } from "../BaseButton";

export class SpriteButton extends BaseButton<Phaser.Button> {
    args: SpriteButtonArgs;

    constructor(args: SpriteButtonArgs) {
        super(args);
    }

    init(game: Phaser.Game): Phaser.Image {
        var btn = new Phaser.Button(game, this.args.x, this.args.y, this.args.initSpriteKey);

        btn.onInputOver.add(() => {
            btn.loadTexture(this.args.overSpriteKey || this.args.initSpriteKey);
        });

        btn.onInputDown.add(() => {
            btn.loadTexture(this.args.pressSpriteKey || this.args.initSpriteKey);
        });

        btn.onInputOut.add(() => {
            btn.loadTexture(this.args.initSpriteKey);
        });

        if (this.args.events) {
            if (this.args.events.up) {
                btn.onInputUp.add(this.args.events.up);
            }
        }

        return btn;
    }

    release(game: Phaser.Game): void {
        super.release(game);

        new ManagedText({
            text: this.args.text,
            fontStyle: {
                font: '18pt ' + Constants.fontFamily,
                fill: '#ffffff'
            },
            y: this.args.y + 25,
            x: this.args.x + 25
        }).release(game);
    }
}
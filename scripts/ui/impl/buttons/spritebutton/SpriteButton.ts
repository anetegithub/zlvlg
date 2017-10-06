import { SpriteButtonArgs } from "./SpriteButtonArgs";
import { ManagedText } from "../../text/ManagedText";
import { } from "../../../../app/core/interfaces/IManagedResource";
import { Constants } from "../../../../utils/globals/Constants";

export class SpriteButton implements IManagedResource {
    args: SpriteButtonArgs;

    constructor(args: SpriteButtonArgs) {
        this.args = args;
    }
    release(game: Phaser.Game): void {
        var btn = new Phaser.Button(game, this.args.x, this.args.y, this.args.initSpriteKey);
        btn.onInputOver.add(() => {
            btn.loadTexture(this.args.overSpriteKey);
        });

        btn.onInputDown.add(() => {
            btn.loadTexture(this.args.pressSpriteKey);
        });

        btn.onInputOut.add(() => {
            btn.loadTexture(this.args.initSpriteKey);
        });

        btn.onInputUp.add(() => {
            this.args.click();
        });

        game.add.existing(btn);

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
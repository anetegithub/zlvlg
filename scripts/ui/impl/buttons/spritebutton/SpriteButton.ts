import { SpriteButtonArgs } from "./SpriteButtonArgs";
import { ManagedText } from "../../text/ManagedText";
import { } from "../../../../app/core/interfaces/IManagedResource";
import { Constants } from "../../../../utils/globals/Constants";
import { BaseButton } from "../BaseButton";
import { TextFactory } from "../../../../utils/ui/textfactory/TextFactory";

export class SpriteButton extends BaseButton<Phaser.Button> {
    args: SpriteButtonArgs;

    constructor(args: SpriteButtonArgs) {
        super(args);
        this.args.events = args.events || {};
        this.args.events.up = args.events.up || function () { };
    }

    private btn: Phaser.Button;
    init(game: Phaser.Game): Phaser.Image {
        this.btn = new Phaser.Button(game, this.args.x, this.args.y, 'uifull', this.args.events.up, this.btn,
            this.args.initFrame,
            this.args.initFrame,
            this.args.pressedFrame);

        return this.btn;
    }

    release(game: Phaser.Game): void {
        super.release(game);

        let fontStyle = {
            font: '18pt ' + Constants.fontFamily,
            fill: '#ffffff'
        };

        let text = TextFactory.new({
            autoinit: false,
            fontStyle: fontStyle,
            text: this.args.text
        });
        text.y = this.args.y + ((this.btn.height - text.height) / 2);
        text.x = this.args.x + ((this.btn.width - text.width) / 2);

        this.btn.events.onInputOver.add(() => {
            var fxdStyle = { ...fontStyle };
            fxdStyle.fill = Constants.color;

            text.setStyle(fxdStyle, true);
        });

        this.btn.events.onInputOut.add(() => {
            text.setStyle(fontStyle, true);
        });
        this.btn.events.onInputUp.add(() => {
            text.setStyle(fontStyle, true);
        });

        game.add.existing(text);
    }
}
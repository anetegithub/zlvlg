import { } from "../../app/core/interfaces/IManagedResource";
import { TextButtonArgs } from "./TextButtonArgs";
import { TextFactory } from "../../../../utils/ui/textfactory/TextFactory";

export class TextButton implements IManagedResource {
    constructor(args: TextButtonArgs) {
        this.args = args;
    }

    args: TextButtonArgs;

    release(game: Phaser.Game): void {
        var text = TextFactory.new({
            fontStyle: this.args.fontStyle,
            y: this.args.y,
            text: this.args.text,
            autoinit: true
        });

        text.inputEnabled = true;

        if (this.args.events.over) {
            text.events.onInputOver.add(this.args.events.over, text);
        }

        if (this.args.events.out) {
            text.events.onInputOut.add(this.args.events.out, text);
        }

        if (this.args.events.up) {
            text.events.onInputUp.add(this.args.events.up, text);
        }

        if (this.args.events.down) {
            text.events.onInputDown.add(this.args.events.down, text);
        }
    }
}
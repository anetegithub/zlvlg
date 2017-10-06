import { } from "../../app/core/interfaces/IManagedResource";
import { TextFactory } from "../../../../utils/ui/textfactory/TextFactory";
import { BaseButton } from "../BaseButton";

export class TextButton extends BaseButton<Phaser.Text> {
    init(game: Phaser.Game): Phaser.Sprite {
        return TextFactory.new({
            fontStyle: this.args.fontStyle,
            y: this.args.y,
            text: this.args.text,
            autoinit: true
        });
    }
}
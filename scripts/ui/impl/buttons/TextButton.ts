import { } from "../../app/core/interfaces/IManagedResource";
import { ButtonArgs } from "./ButtonArgs";
import { TextFactory } from "../../../utils/ui/TextFactory";

export class TextButton implements IManagedResource {
    constructor(args: ButtonArgs) {
        this.args = args;
    }

    args: ButtonArgs;

    release(game: Phaser.Game): void {
        var text = TextFactory.new({
            size: this.args.size,
            y: this.args.y,
            text: this.args.text,
            autoinit: true,
            color: this.args.color
        });

        text.events.onInputDown.add(() => {
            debugger;
            console.log('onInputDown');
        });

        text.events.onInputOut.add(() => {
            debugger;
            console.log('onInputOut');
        });

        text.inputEnabled = true;

        text.events.onInputOver.add(() => {
            debugger;
            console.log('onInputOver');
        });

        text.events.onInputUp.add(() => {
            debugger;
            console.log('onInputUp');
        });

        // text.events.onInputOver.add(() => {
        //     debugger;
        //     if (this.args.event) {
        //         this.args.event(text);
        //     }

        //     text.colors = [
        //         "#FF0000"
        //     ];
        // });
    }
}
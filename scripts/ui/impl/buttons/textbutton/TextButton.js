define(["require", "exports", "../../../../utils/ui/textfactory/TextFactory"], function (require, exports, TextFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TextButton {
        constructor(args) {
            this.args = args;
        }
        release(game) {
            var text = TextFactory_1.TextFactory.new({
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
    exports.TextButton = TextButton;
});

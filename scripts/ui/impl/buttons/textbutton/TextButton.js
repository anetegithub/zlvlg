define(["require", "exports", "../../../../utils/ui/TextFactory"], function (require, exports, TextFactory_1) {
    "use strict";
    exports.__esModule = true;
    var TextButton = /** @class */ (function () {
        function TextButton(args) {
            this.args = args;
        }
        TextButton.prototype.release = function (game) {
            var text = TextFactory_1.TextFactory["new"]({
                size: this.args.size,
                y: this.args.y,
                text: this.args.text,
                autoinit: true,
                color: this.args.color
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
        };
        return TextButton;
    }());
    exports.TextButton = TextButton;
});

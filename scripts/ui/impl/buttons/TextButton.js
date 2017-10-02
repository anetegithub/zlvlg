define(["require", "exports", "../../../utils/ui/TextFactory"], function (require, exports, TextFactory_1) {
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
            text.events.onInputDown.add(function () {
                debugger;
                console.log('onInputDown');
            });
            text.events.onInputOut.add(function () {
                debugger;
                console.log('onInputOut');
            });
            text.inputEnabled = true;
            text.events.onInputOver.add(function () {
                debugger;
                console.log('onInputOver');
            });
            text.events.onInputUp.add(function () {
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
        };
        return TextButton;
    }());
    exports.TextButton = TextButton;
});

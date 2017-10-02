define(["require", "exports", "../../../utils/ui/TextFactory"], function (require, exports, TextFactory_1) {
    "use strict";
    exports.__esModule = true;
    var TextButton = /** @class */ (function () {
        function TextButton(args) {
            this.args = args;
        }
        TextButton.prototype.release = function (game) {
            var _this = this;
            var text = TextFactory_1.TextFactory["new"]({
                size: this.args.size,
                y: this.args.y,
                text: this.args.text,
                autoinit: true,
                color: this.args.color
            });
            text.events.onInputOver.add(function () {
                debugger;
                if (_this.args.event) {
                    _this.args.event(text);
                }
                text.colors = [
                    "#FF0000"
                ];
            });
        };
        return TextButton;
    }());
    exports.TextButton = TextButton;
});

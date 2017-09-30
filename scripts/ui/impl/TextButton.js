define(["require", "exports", "../../utils/ui/TextFactory"], function (require, exports, TextFactory_1) {
    "use strict";
    exports.__esModule = true;
    var TextButton = /** @class */ (function () {
        function TextButton(opts) {
        }
        TextButton.prototype.release = function (game) {
            var text = TextFactory_1.TextFactory["new"]({
                size: 24,
                y: 200,
                text: 'New Game',
                autoinit: true
            });
            text.events.onInputOver.add(function () {
                text.colors = [
                    "#FF0000"
                ];
            });
        };
        return TextButton;
    }());
    exports.TextButton = TextButton;
});

define(["require", "exports", "../../../utils/ui/textfactory/TextFactory"], function (require, exports, TextFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ManagedText {
        constructor(params) {
            this.textStyle = params;
        }
        release(game) {
            this.textStyle.autoinit = true;
            var text = TextFactory_1.TextFactory.new(this.textStyle);
        }
    }
    exports.ManagedText = ManagedText;
});

define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StringExtensions {
        static capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
    exports.StringExtensions = StringExtensions;
});

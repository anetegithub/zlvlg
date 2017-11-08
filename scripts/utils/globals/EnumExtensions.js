define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function enumKeys(_enum) {
        return Object.keys(_enum)
            .map(k => _enum[k])
            .filter(v => typeof v !== "number");
    }
    exports.enumKeys = enumKeys;
});

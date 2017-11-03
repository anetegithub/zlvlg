define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function range(start, end) {
        let arr = [];
        for (var index = start; index <= end; index++) {
            arr.push(index);
        }
        return arr;
    }
    exports.range = range;
});

define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ManagedComponent {
        constructor(release) {
            this.init = release;
        }
        release(game) {
            if (!this.init) {
                throw new Error("Custom managed resource is not implemented.");
            }
            this.init(game);
        }
    }
    exports.ManagedComponent = ManagedComponent;
});
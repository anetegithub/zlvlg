define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Container {
        static onInited(action) {
            this.initActions.push(action);
        }
        static init() {
            this.initActions.forEach(action => action());
            this.initActions = [];
        }
    }
    Container.initActions = [];
    exports.Container = Container;
});

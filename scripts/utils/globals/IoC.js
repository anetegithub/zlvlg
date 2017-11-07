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
        static setCursor(key) {
            document.getElementById('content').style.cursor = `url("./images/ui/cursors/${key}.png"), auto`;
        }
        static register(key, value) {
            Container[key] = value;
        }
        static resolve(key) {
            return Container[key];
        }
    }
    Container.debug = [];
    Container.initActions = [];
    exports.Container = Container;
});

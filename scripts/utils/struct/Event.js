define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Event {
        constructor() {
            this.delegates = [];
        }
        add(delegate) {
            this.delegates.push(delegate);
        }
        remove(delegate) {
            this.delegates = this.delegates.slice(this.delegates.indexOf(delegate), 1);
        }
        fire(sender, args) {
            this.delegates.forEach(delegate => delegate.call(sender, args));
        }
    }
    exports.Event = Event;
});

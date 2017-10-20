define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EventApplier {
        static applyMouse(object) {
            object.inputEnabled = true;
            object.input.useHandCursor = false;
            object.events.onInputOver.add(() => EventApplier.setPointer('point'));
            object.events.onInputOut.add(() => EventApplier.setPointer('cursor'));
            object.events.onInputUp.add(() => EventApplier.setPointer('cursor'));
            object.events.onInputDown.add(() => EventApplier.setPointer('cursor'));
        }
        static setPointer(name) {
            document.getElementById('content').style.cursor = `url("./images/ui/cursors/${name}.png"), auto`;
        }
    }
    exports.EventApplier = EventApplier;
});

define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EventApplier {
        static applyMouse(sprite) {
            sprite.inputEnabled = true;
            sprite.input.useHandCursor = false;
            sprite.events.onInputOver.add(() => EventApplier.setPointer('point'));
            sprite.events.onInputOut.add(() => EventApplier.setPointer('cursor'));
            sprite.events.onInputUp.add(() => EventApplier.setPointer('cursor'));
            sprite.events.onInputDown.add(() => EventApplier.setPointer('cursor'));
        }
        static setPointer(name) {
            document.getElementById('content').style.cursor = `url("./images/ui/cursors/${name}.png"), auto`;
        }
    }
    exports.EventApplier = EventApplier;
});

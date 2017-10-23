define(["require", "exports", "../globals/IoC"], function (require, exports, IoC_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EventApplier {
        static applyMouse(object) {
            object.inputEnabled = true;
            object.input.useHandCursor = false;
            object.events.onInputOver.add(() => IoC_1.Container.setCursor("point"));
            object.events.onInputOut.add(() => IoC_1.Container.setCursor('cursor'));
            object.events.onInputUp.add(() => IoC_1.Container.setCursor('cursor'));
            object.events.onInputDown.add(() => IoC_1.Container.setCursor('cursor'));
        }
    }
    exports.EventApplier = EventApplier;
});

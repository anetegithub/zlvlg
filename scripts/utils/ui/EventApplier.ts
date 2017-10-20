import { InputHandler } from "phaser-ce";

export class EventApplier {
    static applyMouse(object: { events: Phaser.Events, inputEnabled: boolean, input: InputHandler }) {
        object.inputEnabled = true;
        object.input.useHandCursor = false;

        object.events.onInputOver.add(() => EventApplier.setPointer('point'));
        object.events.onInputOut.add(() => EventApplier.setPointer('cursor'));
        object.events.onInputUp.add(() => EventApplier.setPointer('cursor'));
        object.events.onInputDown.add(() => EventApplier.setPointer('cursor'));
    }

    private static setPointer(name: string) {
        document.getElementById('content').style.cursor = `url("./images/ui/cursors/${name}.png"), auto`;
    }
}
import { InputHandler } from "phaser-ce";
import { Container } from "../globals/IoC";

export class EventApplier {
    static applyMouse(object: { events: Phaser.Events, inputEnabled: boolean, input: InputHandler }) {
        object.inputEnabled = true;
        object.input.useHandCursor = false;

        object.events.onInputOver.add(() => Container.setCursor("point"));
        object.events.onInputOut.add(() => Container.setCursor('cursor'));
        object.events.onInputUp.add(() => Container.setCursor('cursor'));
        object.events.onInputDown.add(() => Container.setCursor('cursor'));
    }
}
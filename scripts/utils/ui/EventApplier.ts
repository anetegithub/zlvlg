export class EventApplier {
    static applyMouse(sprite: Phaser.Sprite) {
        sprite.inputEnabled = true;
        sprite.input.useHandCursor = false;

        sprite.events.onInputOver.add(() => EventApplier.setPointer('point'));
        sprite.events.onInputOut.add(() => EventApplier.setPointer('cursor'));
        sprite.events.onInputUp.add(() => EventApplier.setPointer('cursor'));
        sprite.events.onInputDown.add(() => EventApplier.setPointer('cursor'));
    }

    private static setPointer(name: string) {
        document.getElementById('content').style.cursor = `url("./images/ui/cursors/${name}.png"), auto`;
    }
}
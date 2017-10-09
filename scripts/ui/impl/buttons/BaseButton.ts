export abstract class BaseButton<T extends PIXI.Sprite> implements IManagedComponent {
    protected args: IButtonArgs<T>;

    constructor(args: IButtonArgs<T>) {
        this.args = args;
    }

    release(game: Phaser.Game): void {
        var sprite = this.init(game);

        if (this.args.events) {
            sprite.inputEnabled = true;
            sprite.input.useHandCursor = false;

            sprite.events.onInputOver.add(() => this.setPointer('point'));
            if (this.args.events.over) {
                sprite.events.onInputOver.add(this.args.events.over, sprite);
            }

            sprite.events.onInputOut.add(() => this.setPointer('cursor'));
            if (this.args.events.out) {
                sprite.events.onInputOut.add(this.args.events.out, sprite);
            }

            sprite.events.onInputUp.add(() => this.setPointer('cursor'));
            if (this.args.events.up) {
                sprite.events.onInputUp.add(this.args.events.up, sprite);
            }

            sprite.events.onInputDown.add(() => this.setPointer('cursor'));
            if (this.args.events.down) {
                sprite.events.onInputDown.add(this.args.events.down, sprite);
            }
        }

        game.add.existing(sprite);
    }

    private setPointer(name: string) {
        document.getElementById('content').style.cursor = `url("./images/ui/cursors/${name}.png"), auto`;
    }

    abstract init(game: Phaser.Game): Phaser.Sprite | Phaser.Image;
}
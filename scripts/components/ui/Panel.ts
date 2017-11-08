import { Constants } from "../../utils/globals/Constants";
import { TextFactory } from "../../utils/ui/textfactory/TextFactory";
import { Container } from "../../utils/globals/IoC";

export class Panel implements IManagedComponent {
    text: string;
    sprite: Phaser.Sprite;
    background: Phaser.Sprite;

    constructor(pos: Point, background: string, sprite: Phaser.Sprite, text: string) {
        this.sprite = sprite;
        this.text = text;

        this.background = new Phaser.Sprite(Container.game, pos.w, pos.h, Constants.uiAssert, background);
        this.background.inputEnabled = true;
    }

    get width(): number {
        return this.background.width;
    }

    get height(): number {
        return this.background.height;
    }

    click: () => void;

    release(game: Phaser.Game): void {
        const background = this.background;

        let text = TextFactory.new({
            text: this.text,
            fontSize: 16,
            y: (background.y + background.height) + 2
        });

        text.x = (background.width - text.width) / 2 + background.x;
        text.inputEnabled = true;

        let group = new Phaser.Group(game);
        group.add(background);

        if (this.sprite) {
            this.sprite.x = background.x + ((background.width - this.sprite.width) / 2);
            this.sprite.y = background.y + ((background.height - this.sprite.height) / 2);
            group.add(this.sprite);
        }

        group.add(text);

        group.onChildInputOver.add(() => Container.setCursor("point"));
        group.onChildInputOut.add(() => Container.setCursor('cursor'));
        group.onChildInputUp.add(() => Container.setCursor('cursor'));
        group.onChildInputDown.add(() => Container.setCursor('cursor'));

        if (this.click) {
            group.onChildInputDown.add(this.click);
        }

        game.add.existing(group);
    }
}
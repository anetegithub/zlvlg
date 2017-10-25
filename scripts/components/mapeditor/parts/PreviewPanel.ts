import { Container } from "../../../utils/globals/IoC";
import { Constants } from "../../../utils/globals/Constants";
import { SpriteButton } from "../../../ui/impl/buttons/spritebutton/SpriteButton";
import { EventApplier } from "../../../utils/ui/EventApplier";

export class PreviewPanel extends Phaser.Group {
    private preview: Phaser.Sprite;
    private cancelText: Phaser.Text;

    public events: {
        onCancel: Phaser.Signal,
        onPreview: Phaser.Signal
    } = {
        onCancel: new Phaser.Signal(),
        onPreview: new Phaser.Signal()
    };

    constructor() {
        super(Container.game);

        this.cancelText = new Phaser.Text(Container.game, 64, 16, "Click mouse right button for cancel", {
            font: `bold 24pt  ` + Constants.fontFamily,
            fill: "#FFFFFF",
            align: 'center'
        });
        this.cancelText.visible = false;
        Container.game.add.existing(this.cancelText);

        this.preview = new Phaser.Sprite(Container.game, 0, 0);
        this.preview.scale.x = 2;
        this.preview.scale.y = 2;
        this.preview.inputEnabled = false;
        Container.game.add.existing(this.preview);

        this.makeCancel();
    }

    setPreview(sprite: Phaser.Sprite) {
        this.preview.loadTexture(sprite.key, sprite.frame);
        this.preview.visible = true;
        this.preview.bringToTop();

        this.events.onPreview.dispatch();

        Container.game.input.deleteMoveCallback(this.cursorPreview, this);
        Container.game.input.mousePointer.rightButton.onDown.remove(this.makeCancel, this);

        Container.game.input.addMoveCallback(this.cursorPreview, this);
        Container.game.input.mousePointer.rightButton.onDown.add(this.makeCancel, this);
    }

    public get PreviewSprite(): { sprite: Phaser.Sprite, frame: string | number } {
        return {
            sprite: new Phaser.Sprite(Container.game, 0, 0, this.preview.generateTexture()),
            frame: this.preview.frame
        };
    }

    private cursorPreview(pointer, x, y, click) {
        this.cancelText.visible = true;
        this.preview.x = Container.game.input.mouse.event.layerX;
        this.preview.y = Container.game.input.mouse.event.layerY;
    }

    private get xCoord() {
        return Constants.windowWidth - 100 - Constants.gameWindowOffset.x;
    }

    private get yCoord() {
        return Constants.gameWindowOffset.y;
    }

    private makeCancel() {
        Container.game.input.deleteMoveCallback(this.cursorPreview, this);
        this.preview.visible = false;
        this.cancelText.visible = false;
        this.events.onCancel.dispatch();
    }
}
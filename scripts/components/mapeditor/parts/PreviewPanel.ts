import { Container } from "../../../utils/globals/IoC";
import { Constants } from "../../../utils/globals/Constants";
import { SpriteButton } from "../../../ui/impl/buttons/spritebutton/SpriteButton";
import { EventApplier } from "../../../utils/ui/EventApplier";

export class PreviewPanel extends Phaser.Group {
    private preview: Phaser.Sprite;
    private cancel: Phaser.Image;
    public events: {
        onCancel: Phaser.Signal,
        onPreview: Phaser.Signal
    } = {
        onCancel: new Phaser.Signal(),
        onPreview: new Phaser.Signal()
    };

    constructor() {
        super(Container.game);

        var back = new Phaser.Sprite(Container.game, Constants.windowWidth - 100 - Constants.gameWindowOffset.x, Constants.gameWindowOffset.y, "uifull", 'panel_blue');
        this.add(back);

        this.preview = new Phaser.Sprite(Container.game, 0, 0);
        this.preview.scale.x = 2;
        this.preview.scale.y = 2;
        Container.game.add.existing(this.preview);

        this.makeCancel();
    }

    setPreview(sprite: Phaser.Sprite) {
        this.preview.loadTexture(sprite.key, sprite.frame);
        this.preview.x = this.xCoord + (100 - this.preview.width) / 2;
        this.preview.y = this.yCoord + (100 - this.preview.height) / 2;

        this.preview.visible = true;
        this.cancel.visible = true;

        this.preview.bringToTop();
        this.cancel.bringToTop();

        this.events.onPreview.dispatch();
    }

    private get xCoord() {
        return Constants.windowWidth - 100 - Constants.gameWindowOffset.x;
    }

    private get yCoord() {
        return Constants.gameWindowOffset.y;
    }

    private makeCancel() {
        this.cancel = new SpriteButton({
            initFrame: 'iconCross_grey',
            pressedFrame: 'iconCross_grey',
            x: Constants.windowWidth - 37,
            y: this.yCoord + 5
        }).init(Container.game);

        EventApplier.applyMouse(this.cancel);
        this.cancel.events.onInputDown.add(x => {
            this.preview.visible = false;
            this.cancel.visible = false;
            this.events.onCancel.dispatch();
        })

        this.cancel.visible = false;
        Container.game.add.existing(this.cancel);
    }
}
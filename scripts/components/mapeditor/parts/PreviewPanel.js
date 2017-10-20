define(["require", "exports", "../../../utils/globals/IoC", "../../../utils/globals/Constants", "../../../ui/impl/buttons/spritebutton/SpriteButton", "../../../utils/ui/EventApplier"], function (require, exports, IoC_1, Constants_1, SpriteButton_1, EventApplier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PreviewPanel extends Phaser.Group {
        get xCoord() {
            return Constants_1.Constants.windowWidth - 100 - Constants_1.Constants.gameWindowOffset.x;
        }
        get yCoord() {
            return Constants_1.Constants.gameWindowOffset.y;
        }
        constructor() {
            super(IoC_1.Container.game);
            var back = new Phaser.Sprite(IoC_1.Container.game, Constants_1.Constants.windowWidth - 100 - Constants_1.Constants.gameWindowOffset.x, Constants_1.Constants.gameWindowOffset.y, "uifull", 'panel_blue');
            this.add(back);
            this.preview = new Phaser.Sprite(IoC_1.Container.game, 0, 0);
            this.preview.scale.x = 2;
            this.preview.scale.y = 2;
            IoC_1.Container.game.add.existing(this.preview);
            this.makeCancel();
        }
        setPreview(sprite) {
            this.preview.loadTexture(sprite.key, sprite.frame);
            this.preview.x = this.xCoord + (100 - this.preview.width) / 2;
            this.preview.y = this.yCoord + (100 - this.preview.height) / 2;
            this.preview.visible = true;
            this.cancel.visible = true;
            this.preview.bringToTop();
            this.cancel.bringToTop();
        }
        makeCancel() {
            this.cancel = new SpriteButton_1.SpriteButton({
                initFrame: 'iconCross_beige',
                pressedFrame: 'iconCross_beige',
                x: Constants_1.Constants.windowWidth - 37,
                y: this.yCoord + 5
            }).init(IoC_1.Container.game);
            EventApplier_1.EventApplier.applyMouse(this.cancel);
            this.cancel.events.onInputDown.add(x => {
                this.preview.visible = false;
                this.cancel.visible = false;
            });
            this.cancel.visible = false;
            IoC_1.Container.game.add.existing(this.cancel);
        }
    }
    exports.PreviewPanel = PreviewPanel;
});
